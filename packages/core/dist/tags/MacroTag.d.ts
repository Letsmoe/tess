import { Tag } from "../Tag.js";
import { Tess } from "../Tess.js";
import { Args, Kwargs } from "../typings.js";
declare class MacroTag extends Tag {
    private buffer;
    constructor();
    onTagStart(kwargs: string | Kwargs, args?: Args, caller?: Tess): void;
    onTagEnd(kwargs: Kwargs, args?: Args, caller?: Tess): string;
}
export { MacroTag };
