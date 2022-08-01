const example = `{%
	x = {% #!/usr/bin/python print("%") %};
%}
{{x}}
Hello World!`

class InputStream {
	public pos: number = 0;
	public line: number = 1;
	public col: number = 0;
	constructor(private input: string) {}
	next() {
		var ch = this.input.charAt(this.pos++);
		if (ch == "\n") {
			this.line++;
			this.col = 0;
		} else this.col++;
		return ch;
	}
	peek(offset : number = 0) {
		return this.input.charAt(this.pos + offset);
	}
	eof() {
		return this.peek() == "";
	}
	reset() {
		this.pos = 0;
		this.line = 0;
		this.col = 0;
	}
	croak(msg: string) {
		console.error(msg + " (" + this.line + ":" + this.col + ")");
	}
}

class TokenStream {
	private current: any;
	constructor(private stream: InputStream) {}

	private readWhile(predicate : Function) {
		var str = "";
		while (!this.stream.eof() && predicate(this.stream.peek(), this.stream.peek(1)))
			str += this.stream.next();
		return str;
	}

	private readNext() {
		if (this.stream.eof()) return null;
		var ch = this.stream.peek();
		var next = this.stream.peek(1);
		if (ch === "{" && next === "{") {
			this.stream.next()
			this.stream.next()
			return { type: "VariableOpen", text: "{{" }
		} else if (ch === "}" && next === "}") {
			this.stream.next()
			this.stream.next()
			return { type: "VariableClose", text: "}}" }
		} else if (ch === "{" && next ==="%") {
			this.stream.next()
			this.stream.next()
			return { type: "LogicOpen", text: "{%" }
		} else if (ch === "%" && next ==="}") {
			this.stream.next()
			this.stream.next()
			return { type: "LogicClose", text: "%}" }
		} else {
			return { type: "string", text: this.readWhile((curr, next) => {
				let valid = true;
				if (curr === "{" && next === "{") {
					valid = false;
				} else if (curr === "}" && next === "}") {
					valid = false;
				} else if (curr === "{" && next === "%") {
					valid = false;
				} else if (curr === "%" && next ==="}") {
					valid = false;
				}

				return valid;
			}) }
		}
	}

	peek() {
		return this.current || (this.current = this.readNext());
	}
	next() {
		var tok = this.current;
		this.current = null;
		return tok || this.readNext();
	}
	eof() {
		return this.peek() == null;
	}

	croak(msg: string) {
		this.stream.croak(msg);
	}

	all() {
		var tokens: any[] = [];
		while (!this.eof()) tokens.push(this.next());
		return tokens;
	}
}

function parse(input: TokenStream): AST {
	function parseLogicBlock() {
		input.next();
		let children = [];

		while(!input.eof()) {
			let tok = input.peek();
			if (tok.type === "LogicClose") {
				input.next()
				break
			} else {
				let next = parseNext();
				children.push(next)
			}
		}

		return {
			type: "LogicBlock",
			children
		}
	}

	function parseVariableBlock() {
		input.next();
		let children = [];

		while(!input.eof()) {
			let tok = input.peek();
			if (tok.type === "VariableClose") {
				input.next()
				break
			} else {
				let next = parseNext();
				children.push(next)
			}
		}

		return {
			type: "VariableBlock",
			children
		}
	}

	function parseNext() {
		const tok = input.peek()
		if (tok.type === "VariableOpen") {
			return parseVariableBlock()
		} else if (tok.type === "LogicOpen") {
			return parseLogicBlock();
		} else {
			return input.next()
		}
	}

	var prog = [];
	while (!input.eof()) {
		let next = parseNext();
		prog.push(next)
	}
	return { type: "Program", children: prog };
}

const input = new InputStream(example)
const tokens = new TokenStream(input)
const ast = parse(tokens)

type AST = {
	type: "string" | "VariableBlock" | "LogicBlock" | "Program";
	children: AST[]
}

function execute(ast: AST) {
	const recurse = (tree: AST) => {
		for (const child of tree.children) {
			if (child.type === "LogicBlock") {
				console.log(child);
				
			}
		}
	}

	recurse(ast);
}

execute(ast)