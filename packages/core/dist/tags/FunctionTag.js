import { Tag } from "../Tag.js";
import { TextBuffer } from "../TextBuffer.js";
class FunctionTag extends Tag {
    constructor() {
        super("function", { selfClosing: false, rawArgumentString: true });
    }
    onTagStart(kwargs, args, caller) {
        this.buffer = new TextBuffer();
        caller.attach(this.buffer);
    }
    onTagEnd(kwargs, args, caller) {
        var code = this.buffer.flushArray().join("").trim();
        // Remove leading and trailing quotes from the code string.
        // Replace literal `\n` with a newline character.
        code = code.substring(1, code.length - 1).replace(/\\n/g, "\n");
        caller.detach(this.buffer);
        return `function ${kwargs} {
			${code}
		}`;
    }
}
export { FunctionTag };
//# sourceMappingURL=FunctionTag.js.map