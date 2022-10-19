import { Tag } from "../Tag.js";
import { Tess } from "../Tess.js";
import { Args, Kwargs } from "../typings.js";
declare class CodeTag extends Tag {
    private buffer;
    constructor();
    onTagStart(kwargs: string | Kwargs, args?: Args, caller?: Tess): string | void;
    onTagEnd(kwargs: Kwargs, args?: Args, caller?: Tess): string | void;
}
export { CodeTag };