import { Tag } from "../Tag.js";
class ElseIfTag extends Tag {
    constructor() {
        super("elif", { selfClosing: true, rawArgumentString: true });
    }
    onTagStart(str) {
        return `} else if (${str}) {`;
    }
}
export { ElseIfTag };
//# sourceMappingURL=ElseIfTag.js.map