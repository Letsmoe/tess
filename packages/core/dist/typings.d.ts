import { Tag } from "./Tag.js";
import { Tess } from "./Tess.js";
declare type Kwargs = {
    [key: string]: any;
};
declare type Args = any[];
declare type Environment = {
    [key: string]: typeof Tag;
};
interface TagOptions {
    /**
     * Whether the tag is self-closing, meaning that it doesn't need a closing tag but consists only of an opening tag.
     * Example: `{#block arg kwarg=""}`
     */
    selfClosing?: boolean;
    rawArgumentString?: boolean;
}
declare type BeginCallback = (kwargs: Kwargs | string, args: Args, caller: Tess) => string;
declare type EndCallback = (kwargs: Kwargs | string, args: Args, caller: Tess) => string;
interface TessOptions {
    /**
     * The language used as a default when no lang parameters is specified in `{#code}` blocks.
     */
    defaultLanguage?: string;
    /**
     * Whether to generate the default preamble and postamble.
     */
    generateWrapper?: boolean;
}
export { Kwargs, Args, Environment, TagOptions, BeginCallback, EndCallback, TessOptions };
