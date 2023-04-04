import { Tag } from "../Tag.js";
declare class EachTag extends Tag {
    constructor();
    onTagStart(str: string): string;
    onTagEnd(): string;
}
export { EachTag };
