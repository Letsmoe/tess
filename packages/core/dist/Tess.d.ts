import { LanguageHandler } from "./LanguageHandler.js";
import { TextBuffer } from "./TextBuffer.js";
import { Environment, TessOptions } from "./typings.js";
declare class Tess {
    environment: Environment;
    options: TessOptions;
    constructor(options?: TessOptions, environment?: Environment);
    private code;
    private buffer;
    private opsStack;
    /**
     *
     * @param text The text to construct a template base from
     */
    compile(text: string): void;
    /**
     * A function that will take a string to parse and return an object containing keyword arguments and default arguments.
     * Example:
     * ```
     * 	'"string argument" lang="de-DE"' // { kwargs: { lang: "de-DE" }, args: ["string argument"] }
     * ```
     * @param str The string to parse the arguments from
     */
    private parseArguments;
    private languageHandlers;
    /**
     * A method removing a language handler or TextBuffer from the current class instance.
     * When a language handler is passed, it will be matched against the assigned ones, only those who were assigned the same Symbol will be removed.
     * A TextBuffer will cause the instance to revert to its original state, using the default buffer.
     * @param item A LanguageHandler or TextBuffer to match against.
     * @param args Some additional arguments that might be required for a specific process.
     */
    detach(item: TextBuffer | LanguageHandler, ...args: any[]): void;
    /**
     * Attaches a new buffer or language handler to the current class instance depending on which type was passed.
     * @param item (TextBuffer | LanguageHandler) The buffer or language handler to attach.
     * @param args string[] Additional arguments to be passed for the initialization.
     * @return void
     */
    attach(item: TextBuffer | LanguageHandler, ...args: any[]): void;
    private _execute_code;
    /**
     * Renders the template with the given variables.
     * @param context An object with items to use for this render.
     * @returns
     */
    render(context?: any): Promise<any>;
    private flushOutput;
    private _syntax_error;
    private addPreamble;
    private addPostamble;
}
declare const globalLanguageHandlers: {};
declare function setGlobalHandler(handler: LanguageHandler, languages?: string | string[]): void;
export { Tess, setGlobalHandler, globalLanguageHandlers };
