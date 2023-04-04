import { Tag } from "../Tag.js";
import { TessOptions } from "../typings.js";
declare class LangCommand extends Tag {
    constructor();
    onUse(options: TessOptions, lang: string): void;
}
export { LangCommand };
