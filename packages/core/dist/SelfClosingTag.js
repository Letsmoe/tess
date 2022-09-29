import { Tag } from "./Tag.js";
class SelfClosingTag extends Tag {
    constructor(name, callback, options) {
        super(name, callback, Object.assign(options, { selfClosing: true }));
    }
}
export { SelfClosingTag };
//# sourceMappingURL=SelfClosingTag.js.map