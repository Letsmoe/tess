const example = `{{
	x = {{#/usr/bin/python print(5) }};
}}

Hello World!`;
class InputStream {
    constructor(input) {
        this.input = input;
        this.pos = 0;
        this.line = 1;
        this.col = 0;
    }
    next() {
        var ch = this.input.charAt(this.pos++);
        if (ch == "\n") {
            this.line++;
            this.col = 0;
        }
        else
            this.col++;
        return ch;
    }
    peek(offset = 0) {
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
    croak(msg) {
        console.error(msg + " (" + this.line + ":" + this.col + ")");
    }
}
class TokenStream {
    constructor(stream) {
        this.stream = stream;
    }
    readWhile(predicate) {
        var str = "";
        while (!this.stream.eof() && predicate(this.stream.peek()))
            str += this.stream.next();
        return str;
    }
    readNext() {
        if (this.stream.eof())
            return null;
        var ch = this.stream.peek();
        if (ch === "{") {
            return { type: "l_curly", text: this.stream.next() };
        }
        else if (ch === "}") {
            return { type: "r_curly", text: this.stream.next() };
        }
        else if (ch === "#") {
            return { type: "hash", text: this.stream.next() };
        }
        else if (ch === "!") {
            return { type: "exclamation", text: this.stream.next() };
        }
        else if (ch !== " ") {
            return { type: "string", text: this.readWhile(x => (x !== " ") && (x !== "{") && (x !== "}")) };
        }
        else if (ch === " ") {
            return { type: "space", text: this.stream.next() };
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
    croak(msg) {
        this.stream.croak(msg);
    }
    all() {
        var tokens = [];
        while (!this.eof())
            tokens.push(this.next());
        return tokens;
    }
}
function parse(input) {
    function isChar(char) {
        const tok = input.peek();
        return tok && (tok.type !== "string") && tok.text === char;
    }
    function parseBlock() {
        input.next();
        input.next();
        let children = [];
        let source = "";
        if (input.peek().type === "hash") {
            input.next();
            source = input.next().text;
        }
        while (!input.eof()) {
            if (input.peek().type === "r_curly") {
                input.next();
                input.next();
                break;
            }
            ;
            children.push(parseNext());
        }
        return {
            type: "block",
            source,
            children
        };
    }
    function parseNext() {
        const tok = input.peek();
        if (tok.type === "l_curly") {
            return parseBlock();
        }
        else {
            input.next();
            return tok;
        }
    }
    function parseString() {
        let content = "";
        while (!input.eof() && ((input.peek().type === "string") || (input.peek().type === "space"))) {
            content += input.next().text;
        }
        return { type: "string", content };
    }
    function parseToplevel() {
        var prog = [];
        while (!input.eof()) {
            if (isChar("{")) {
                let block = parseBlock();
                prog.push(block);
            }
            else {
                prog.push(parseString());
            }
        }
        return { type: "Program", body: prog };
    }
    return parseToplevel();
}
const input = new InputStream(example);
const tokens = new TokenStream(input);
const ast = parse(tokens);
console.log(JSON.stringify(ast, null, 2));
