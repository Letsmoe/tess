import { CodeBuilder } from "./CodeBuilder.js";
import { DEFAULT_ENVIRONMENT } from "./Environment.js";
import { LanguageHandler } from "./LanguageHandler.js";
import { TextBuffer } from "./TextBuffer.js";
import { Args, Environment, Kwargs, TessOptions } from "./typings.js";

const defaultBuffer = new TextBuffer();
defaultBuffer.onFlush = (buffer) => {
	return `extend_result(${buffer.join(", ")});`;
} 

class Tess {
	public options: TessOptions;
	public constructor(options: TessOptions = {}, public environment: Environment = DEFAULT_ENVIRONMENT) {
		this.options = Object.assign(
			{
				defaultLanguage: "",
				generateWrapper: true
			},
			options
		);
	}
	private code = new CodeBuilder();
	private buffer = defaultBuffer;
	private opsStack = [];
	public getOptions(): TessOptions {
		return Object.assign({}, this.options);
	}

	public getEnvironment(): Environment {
		return this.environment;
	}

	/**
	 *
	 * @param text The text to construct a template base from
	 */
	public async compile(text: String) {
		this.code = new CodeBuilder();
		this.buffer = defaultBuffer;
		this.opsStack = [];
		const code = this.code;
		if (this.options.generateWrapper) {
			this.addPreamble();
		}
		
		// Split the text based on tokens
		const tokens = text.split(
			/({{.*?}}|{%.*?}|{\/.*?}|{#.*?}|{:.*?}|{!.*?})/gs
		);
		// Iterate over the tokens and do something based on what the token is.
		for (const token of tokens) {
			if (token.startsWith("{!")) {
				// Comment: ignore and move on
				continue;
			} else if (token.startsWith("{{")) {
				// Expression to evaluate.
				const expr = token.substring(2, token.length - 2).trim();
				this.buffer.push(`to_str(${expr})`);
			} else if (token.startsWith("{#") || token.startsWith("{:")) {
				// Action tag: split into words and parse further.
				this.flushOutput();
				const words = token
					.substring(2, token.length - 1)
					.trim()
					.split(" ");

				// Get the tag name from the directive call.
				const tagName = words[0]
				// Check if the tag name exists in the environment.
				if (this.environment.hasOwnProperty(tagName)) {
					let beginString: string | void | Promise<string>, kwargs: Kwargs | string, args: Args;
					// If it is present in the environment, parse the arguments and keywords arguments and call the onBegin and callback method on the Tag.
					const tag = new (this.environment[tagName])();
					const argString: string = token.substring(2 + tagName.length, token.length - 1).trim();
					if (tag.options.rawArgumentString) {
						kwargs = argString;
						args = [];
					} else {
						const result = this.parseArguments(argString);
						kwargs = result.kwargs;
						args = result.args;
					}

					beginString = tag.onTagStart(kwargs, args, this);
					// We want to push the begin string right onto our code.
					if (beginString instanceof Promise) {
						beginString = await beginString;
					}
					if (beginString) {
						code.addLine(beginString);
					}
					tag.onUse(this.options, kwargs, args);
					
					if (tag.options.selfClosing === true) {
						let endString = tag.onTagEnd(kwargs, args);
						// Add the code to our codeBuilder
						if (endString instanceof Promise) {
							endString = await endString;
						}
						if (endString) {
							code.addLine(endString);
						}
					} else {
						// Push the name and the arguments onto the operation stack.
						this.opsStack.push({ kwargs, args, tag });
					}
				} else {
					this._syntax_error("Call to undefined method", tagName);
				}
			} else if (token.startsWith("{/")) {
				const words = token
					.substring(2, token.length - 1)
					.trim()
					.split(" ");
				const endWhat = words[0];
				// End something: Pop the ops stack.
				if (words.length != 1) {
					this._syntax_error("Malformed end tag", token);
				}

				if (this.opsStack.length == 0) {
					this._syntax_error("Too many ends", token);
				}
				const startWhat = this.opsStack.pop();
				if (startWhat.tag.name != endWhat) {
					this._syntax_error("Mismatched end tag", endWhat);
				}

				let endString = startWhat.tag.onTagEnd(startWhat.kwargs, startWhat.args, this);

				if (endString instanceof Promise) {
					endString = await endString;
				}
				if (endString) {
					this.code.addLine(endString);
				}
				this.flushOutput();
			} else {
				// Literal content. Output if not empty.
				if (token.match(/[^\t \r]/g)) {
					this.buffer.push(JSON.stringify(token));
				}
			}
		}

		if (this.opsStack.length > 0) {
			this._syntax_error("Unmatched tag", this.opsStack.at(-1).name);
		}

		this.flushOutput();
		if (this.options.generateWrapper) {
			this.addPostamble();
		}
	}

	/**
	 * A function that will take a string to parse and return an object containing keyword arguments and default arguments.
	 * Example:
	 * ```
	 * 	'"string argument" lang="de-DE"' // { kwargs: { lang: "de-DE" }, args: ["string argument"] }
	 * ```
	 * @param str The string to parse the arguments from
	 */
	private parseArguments(str: string): { kwargs: Kwargs, args: Args } {
		const kwargs: Kwargs = {};
		const args: Args = [];
		// At first we can remove the keywords arguments since they are the easiest to parse.
		// For now we just want to find strings as values.
		str = str.replace(/([A-z0-9?!-_.;]+)=(.*),?/g, (all, name, value) => {
			kwargs[name] = JSON.parse(value);
			return "";
		})
		
		// Now we can run over the argument and push them into the args array.
		const matches = str.split(/(?<=")\s*,/).map(x => x.trim()).filter(x => x);
		for (const match of matches) {
			args.push(JSON.parse(match))
		}

		return { kwargs, args };
	}

	private languageHandlers: { [key: string]: LanguageHandler } =
		globalLanguageHandlers;

	/**
	 * A method removing a language handler or TextBuffer from the current class instance.
	 * When a language handler is passed, it will be matched against the assigned ones, only those who were assigned the same Symbol will be removed.
	 * A TextBuffer will cause the instance to revert to its original state, using the default buffer.
	 * @param item A LanguageHandler or TextBuffer to match against.
	 * @param args Some additional arguments that might be required for a specific process.
	 */
	public detach(item: TextBuffer | LanguageHandler, ...args: any[]): void {
		if (item instanceof TextBuffer) {
			this.buffer = defaultBuffer;
		} else if (item instanceof LanguageHandler) {
			for (const lang in this.languageHandlers) {
				// We iterate through every language handler that has been assigned, if we find that the two classes match
				// we need to remove the language, strict equality will cause two objects to only match if they're the same Symbol.
				let handler = this.languageHandlers[lang];
				if (handler === item) {
					delete this.languageHandlers[lang];
				}
			}
		}
	}

	/**
	 * Attaches a new buffer or language handler to the current class instance depending on which type was passed.
	 * @param item (TextBuffer | LanguageHandler) The buffer or language handler to attach.
	 * @param args string[] Additional arguments to be passed for the initialization.
	 * @return void
	 */
	public attach(item: TextBuffer | LanguageHandler, ...args: any[]): void {
		if (item instanceof TextBuffer) {
			this.buffer = item;
		} else if (item instanceof LanguageHandler) {
			let languages = [args[0] || []].flat(Infinity).concat(item.languages);
			for (const lang of languages) {
				this.languageHandlers[lang] = item;
			}
		}
	}

	private _execute_code(lang: string, code: string[]): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			if (this.languageHandlers.hasOwnProperty(lang)) {
				this.languageHandlers[lang].execute(code).then((result) => {
					resolve(result);
				});
			} else {
				throw new Error(
					"Cannot execute language: " +
						lang +
						". A language handler has not been implemented."
				);
			}
		});
	}

	/**
	 * Renders the template with the given variables.
	 * @param context An object with items to use for this render.
	 * @returns
	 */
	public async render(context = null) {
		// Make the complete context we'll use.
		let result = await this.code.getRenderFunction(context)(
			context,
			this._execute_code.bind(this)
		);
		return result;
	}

	public getCode(): string {
		return this.code.toString();
	}

	private flushOutput() {
		this.code.addLine(this.buffer.flush());
	}

	private _syntax_error(msg: string, thing: any) {
		throw new SyntaxError(`${msg}: ${thing}`);
	}

	private addPreamble() {
		this.code.addLine(
			"return async function render_function(%s, _execute_code) {"
		);
		// Firstly, we need to unfold the context into the current environment.
		this.code.addLine("const result = [];");
		this.code.addLine(
			"const extend_result = (...x) => x.map(y => result.push(y));"
		);
		this.code.addLine("const to_str = (x) => (x && x.toString()) || '';");
	}

	private addPostamble() {
		this.code.addLine("return result.join('');");
		this.code.addLine("}");
	}
}

const globalLanguageHandlers = {};

function setGlobalHandler(
	handler: LanguageHandler,
	languages: string | string[] = []
): void {
	languages = ([languages].flat(Infinity) as string[]).concat(
		handler.languages
	);
	for (const lang of languages) {
		globalLanguageHandlers[lang] = handler;
	}
}

export { Tess, setGlobalHandler, globalLanguageHandlers };
