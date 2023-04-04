import { Tag } from "../Tag.js";
declare class DefineCommand extends Tag {
    constructor();
    onTagStart(kwargs: string, args: any[]): string;
}
export { DefineCommand };
