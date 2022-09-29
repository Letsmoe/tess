import { LanguageHandler } from "./LanguageHandler.js";
import { Environment } from "./typings.js";
interface TessOptions {
    /**
     * The language used as a default when no lang parameters is specified in `{#code}` blocks.
     */
    defaultLanguage?: string;
}
declare class Tess {
    environment: Environment;
    private options;
    constructor(options?: TessOptions, environment?: Environment);
    private code;
    private buffered;
    private oldBuffer;
    private opsStack;
    private _render_function;
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
     * Registers a new language handler for controlling requests on `{#code}` blocks.
     * @param languages An array of languages or a single language to register a language handler onto.
     * @param handler A language handler. It will handle all requests that are made when the user uses the specified language in his/her code.
     */
    languageHandler(handler: LanguageHandler, languages?: string | string[]): void;
    private _execute_code;
    /**
     * Renders the template with the given variables.
     * @param context An object with items to use for this render.
     * @returns
     */
    render(context?: any): Promise<any>;
    private flushOutput;
    private _syntax_error;
}
declare const globalLanguageHandlers: {};
declare function setGlobalHandler(handler: LanguageHandler, languages?: string | string[]): void;
export { Tess, setGlobalHandler, globalLanguageHandlers };
