import { CodeBuilder } from "./CodeBuilder.js";
import { DEFAULT_ENVIRONMENT } from "./Environment.js";
class Tess {
    constructor(options = {}, environment = DEFAULT_ENVIRONMENT) {
        this.environment = environment;
        this.code = new CodeBuilder();
        this.buffered = [];
        this.oldBuffer = [];
        this.opsStack = [];
        this.languageHandlers = globalLanguageHandlers;
        this.options = Object.assign({
            defaultLanguage: "",
        }, options);
    }
    /**
     *
     * @param text The text to construct a template base from
     */
    compile(text) {
        this.oldBuffer = [];
        this.code = new CodeBuilder();
        this.buffered = [];
        this.opsStack = [];
        this._render_function = null;
        const code = this.code;
        code.addLine("return async function render_function(%s, _execute_code) {");
        // Firstly, we need to unfold the context into the current environment.
        code.addLine("const result = [];");
        code.addLine("const extend_result = (...x) => x.map(y => result.push(y));");
        code.addLine("const to_str = (x) => (x && x.toString()) || '';");
        // Split the text based on tokens
        const tokens = text.split(/({{.*?}}|{%.*?}|{\/.*?}|{#.*?}|{:.*?}|{!.*?})/gs);
        // Iterate over the tokens and do something based on what the token is.
        for (const token of tokens) {
            if (token.startsWith("{!")) {
                // Comment: ignore and move on
                continue;
            }
            else if (token.startsWith("{{")) {
                // Expression to evaluate.
                const expr = token.substring(2, token.length - 2).trim();
                this.buffered.push(`to_str(${expr})`);
            }
            else if (token.startsWith("{#") || token.startsWith("{:")) {
                // Action tag: split into words and parse further.
                this.flushOutput();
                const words = token
                    .substring(2, token.length - 1)
                    .trim()
                    .split(" ");
                // Get the tag name from the directive call.
                const tagName = words[0];
                // Check if the tag name exists in the environment.
                if (this.environment.hasOwnProperty(tagName)) {
                    let beginString, kwargs, args;
                    // If it is present in the environment, parse the arguments and keywords arguments and call the onBegin and callback method on the Tag.
                    const tag = this.environment[tagName];
                    const argString = token.substring(2 + tagName.length, token.length - 1).trim();
                    if (tag.options.rawArgumentString) {
                        kwargs = argString;
                        args = [];
                    }
                    else {
                        const result = this.parseArguments(argString);
                        kwargs = result.kwargs;
                        args = result.args;
                    }
                    beginString = tag.onBegin(kwargs, args);
                    // We want to push the begin string right onto our code.
                    code.addLine(beginString);
                    tag.callback(kwargs, args);
                    if (tag.options.selfClosing === true) {
                        // If the tag is self-closing, we don't need to push the name onto the operation stack.
                        // We can also just call the onEnd method right away.
                        const endString = tag.onEnd(kwargs, args);
                        // Add the code to our codeBuilder
                        code.addLine(endString);
                    }
                    else {
                        // Push the name and the arguments onto the operation stack.
                        this.opsStack.push({ kwargs, args, name: tagName });
                    }
                }
                if (words[0] === "code") {
                    // We need to parse named parameters here. (lang="python") without splitting at every whitespace. That won't work.
                    const { kwargs, args } = this.parseArguments(words.slice(1).join(" "));
                    // If no lang parameter was passed, we can use the options default one.
                    kwargs.lang = kwargs.lang || this.options.defaultLanguage;
                    this.opsStack.push({ kwargs, args, name: "code" });
                    // Now we need to redirect the buffer, to take the content literally.
                    this.oldBuffer = this.buffered;
                    this.buffered = [];
                }
            }
            else if (token.startsWith("{/")) {
                const words = token
                    .substring(2, token.length - 1)
                    .trim()
                    .split(" ");
                const endWhat = words[0];
                // End something: Pop the ops stack.
                if (words.length != 1) {
                    this._syntax_error("Don't understand end", token);
                }
                if (this.opsStack.length == 0) {
                    this._syntax_error("Too many ends", token);
                }
                const startWhat = this.opsStack.pop();
                if (startWhat.name != endWhat) {
                    this._syntax_error("Mismatched end tag", endWhat);
                }
                if (endWhat == "code") {
                    if (startWhat.kwargs.var) {
                        // Assign the output of the code to a variable
                        code.addLine(`let ${startWhat.kwargs.var} = await _execute_code("${startWhat.kwargs.lang}", [`);
                    }
                    else {
                        code.addLine(`await _execute_code("${startWhat.kwargs.lang}", [`);
                    }
                    // Output the buffer literally into a function that will handle the call.
                    // Assign the old buffer so it will become the current buffer.
                    this.buffered.map((x) => {
                        code.addLine(x);
                    });
                    code.addLine(`])`);
                    this.buffered = this.oldBuffer;
                    continue;
                }
                this.flushOutput();
                this.code.addLine(this.environment[startWhat.name].onEnd(startWhat.kwargs, startWhat.args));
                //this.code.addLine("}");
            }
            else {
                // Literal content. Output if not empty.
                if (token.trim().length > 0) {
                    this.buffered.push(JSON.stringify(token));
                }
            }
        }
        if (this.opsStack.length > 0) {
            this._syntax_error("Unmatched tag", this.opsStack.at(-1).name);
        }
        this.flushOutput();
        code.addLine("return result.join('');");
        code.addLine("}");
    }
    /**
     * A function that will take a string to parse and return an object containing keyword arguments and default arguments.
     * Example:
     * ```
     * 	'"string argument" lang="de-DE"' // { kwargs: { lang: "de-DE" }, args: ["string argument"] }
     * ```
     * @param str The string to parse the arguments from
     */
    parseArguments(str) {
        const kwargs = {};
        const args = [];
        // At first we can remove the keywords arguments since they are the easiest to parse.
        // For now we just want to find strings as values.
        str = str.replace(/(.*?)="((?:[^"\\]|\\.)*)"/g, (all, name, value) => {
            kwargs[name] = value;
            return "";
        });
        // Now we can run over the argument and push them into the args array.
        const matches = Array.from(str.matchAll(/(?:"(.*?)"|([^ ]+))/g));
        for (const match of matches) {
            args.push(match[1] || match[0]);
        }
        return { kwargs, args };
    }
    /**
     * Registers a new language handler for controlling requests on `{#code}` blocks.
     * @param languages An array of languages or a single language to register a language handler onto.
     * @param handler A language handler. It will handle all requests that are made when the user uses the specified language in his/her code.
     */
    languageHandler(handler, languages = []) {
        // Convert languages to a one-dimensional array, this will ensure that when a string is passed we get an array as well.
        // Since you might want to specify other languages that can be handled by a specific handler as well as others, optional languages can be passed as second parameter.
        // Normally, the languages will be pulled from the handler.
        languages = [languages].flat(Infinity).concat(handler.languages);
        for (const lang of languages) {
            this.languageHandlers[lang] = handler;
        }
    }
    _execute_code(lang, code) {
        return new Promise((resolve, reject) => {
            if (this.languageHandlers.hasOwnProperty(lang)) {
                this.languageHandlers[lang].execute(code).then((result) => {
                    resolve(result);
                });
            }
            else {
                throw new Error("Cannot execute language: " +
                    lang +
                    ". A language handler has not been implemented.");
            }
        });
    }
    /**
     * Renders the template with the given variables.
     * @param context An object with items to use for this render.
     * @returns
     */
    async render(context = null) {
        // Make the complete context we'll use.
        this._render_function = this.code.getRenderFunction(context);
        return await this._render_function(context, this._execute_code.bind(this));
    }
    flushOutput() {
        this.code.addLine(`extend_result(${this.buffered.join(", ")});`);
        // Reset the buffer
        this.buffered = [];
    }
    _syntax_error(msg, thing) {
        throw new SyntaxError(`${msg}: ${thing}`);
    }
}
const globalLanguageHandlers = {};
function setGlobalHandler(handler, languages = []) {
    languages = [languages].flat(Infinity).concat(handler.languages);
    for (const lang of languages) {
        globalLanguageHandlers[lang] = handler;
    }
}
export { Tess, setGlobalHandler, globalLanguageHandlers };
//# sourceMappingURL=Tess.js.map