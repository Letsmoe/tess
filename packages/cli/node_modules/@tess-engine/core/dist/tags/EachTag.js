import { Tag } from "../Tag.js";
class EachTag extends Tag {
    constructor() {
        super("each", { selfClosing: false, rawArgumentString: true });
    }
    onTagStart(str) {
        return `for (${str}) {`;
    }
    onTagEnd() {
        return "}";
    }
}
export { EachTag };
//# sourceMappingURL=EachTag.js.map