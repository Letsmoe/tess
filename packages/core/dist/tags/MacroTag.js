import { Tag } from "../Tag.js";
import { TextBuffer } from "../TextBuffer.js";
class MacroTag extends Tag {
    constructor() {
        super("macro", { selfClosing: false, rawArgumentString: true });
    }
    onTagStart(kwargs, args, caller) {
        this.buffer = new TextBuffer();
        caller.attach(this.buffer);
        return;
    }
    onTagEnd(kwargs, args, caller) {
        const code = this.buffer.flushArray().join("+").trim();
        caller.detach(this.buffer);
        return `function ${kwargs} {
			return ${code}
		}`;
    }
}
export { MacroTag };
//# sourceMappingURL=MacroTag.js.map