import { Tag } from "./Tag.js";
import { Args, Kwargs, TagOptions } from "./typings.js";
declare class SelfClosingTag extends Tag {
    constructor(name: string, callback: (kwargs: Kwargs, args: Args) => any, options: TagOptions);
}
export { SelfClosingTag };
