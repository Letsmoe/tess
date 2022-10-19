import { Tag } from "../Tag.js";
import { TextBuffer } from "../TextBuffer.js";
class CodeTag extends Tag {
    constructor() {
        super("code", { selfClosing: false, rawArgumentString: false });
    }
    onTagStart(kwargs, args, caller) {
        this.buffer = new TextBuffer();
        this.buffer.onAdd = (value, buffer) => {
            buffer[buffer.length - 1] = JSON.parse(value);
        };
        caller.attach(this.buffer);
    }
    onTagEnd(kwargs, args, caller) {
        caller.detach(this.buffer);
        return `let ${kwargs.var} = await _execute_code("${kwargs.lang || caller.options.defaultLanguage}", [${this.buffer.flush()}])`;
    }
}
export { CodeTag };
//# sourceMappingURL=CodeTag.js.map