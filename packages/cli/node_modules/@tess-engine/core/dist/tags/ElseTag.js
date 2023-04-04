import { Tag } from "../Tag.js";
class ElseTag extends Tag {
    constructor() {
        super("else", { selfClosing: true, rawArgumentString: true });
    }
    onTagStart() {
        return `} else {`;
    }
}
export { ElseTag };
//# sourceMappingURL=ElseTag.js.map