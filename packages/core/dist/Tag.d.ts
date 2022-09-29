import { Args, BeginCallback, EndCallback, Kwargs, TagOptions } from "./typings.js";
declare class Tag {
    name: string;
    callback: (kwargs: Kwargs | string, ...args: Args) => any;
    options: TagOptions;
    constructor(name: string, callback: (kwargs: Kwargs | string, ...args: Args) => any, options?: TagOptions, onBegin?: BeginCallback, onEnd?: EndCallback);
    /**
     * A function that is called once a matching tag has been found.
     * It should return a string in JS format which can be executed later on.
     * @returns A string which will be inserted at the beginning of the tag, this will end up in the compiled code.
     */
    onBegin(kwargs: Kwargs | string, args?: Args): string;
    /**
     * A function that is called once a matching tag has ended.
     * It should return a string in JS format which can be executed later on.
     * @param kwargs An object containing keyword arguments which were passed to the directive.
     * @param args A list of arguments which were passed to the directive.
     * @returns A string which will be inserted at the end of the tag, this will end up in the compiled code.
     */
    onEnd(kwargs: Kwargs | string, args?: Args): string;
}
export { Tag };
