import { Tag } from "../Tag.js";
import { Tess } from "../Tess.js";
declare class IncludeCommand extends Tag {
    constructor();
    onTagStart(kwargs: string, args: any[], caller: Tess): string;
}
export { IncludeCommand };
