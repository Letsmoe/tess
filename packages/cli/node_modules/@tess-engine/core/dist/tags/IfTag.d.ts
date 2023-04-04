import { Tag } from "../Tag.js";
declare class IfTag extends Tag {
    constructor();
    onTagStart(str: string): string;
    onTagEnd(): string;
}
export { IfTag };
