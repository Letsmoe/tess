import { Tess } from "./Tess.js";
import { Args, Kwargs, TagOptions, TessOptions } from "./typings.js";
declare class Tag {
    name: string;
    options: TagOptions;
    constructor(name?: string, options?: TagOptions);
    onUse(options: TessOptions, kwargs: Kwargs | string, ...args: Args): void;
    /**
     * A function that is called once a matching tag has been found.
     * It should return a string in JS format which can be executed later on.
     * @returns A string which will be inserted at the beginning of the tag, this will end up in the compiled code.
     */
    onTagStart(kwargs: Kwargs | string, args?: Args, caller?: Tess): string | void;
    /**
     * A function that is called once a matching tag has ended.
     * It should return a string in JS format which can be executed later on.
     * @param kwargs An object containing keyword arguments which were passed to the directive.
     * @param args A list of arguments which were passed to the directive.
     * @returns A string which will be inserted at the end of the tag, this will end up in the compiled code.
     */
    onTagEnd(kwargs: Kwargs | string, args?: Args, caller?: Tess): string | void;
}
export { Tag };
