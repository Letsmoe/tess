import { Tag } from "../Tag.js";
class IfTag extends Tag {
    constructor() {
        super("if", { selfClosing: false, rawArgumentString: true });
    }
    onTagStart(str) {
        return `for (${str}) {`;
    }
    onTagEnd() {
        return "}";
    }
}
export { IfTag };
//# sourceMappingURL=IfTag.js.map