import { Tag } from "../Tag.js";
import { TextBuffer } from "../TextBuffer.js";
class CodeTag extends Tag {
    constructor() {
        super("code", { selfClosing: false, rawArgumentString: false });
    }
    onTagStart(kwargs, args, caller) {
        this.buffer = new TextBuffer();
        caller.attach(this.buffer);
    }
    onTagEnd(kwargs, args, caller) {
        let code = "";
        if (kwargs.var) {
            code = `let ${kwargs.var} = await _execute_code("${kwargs.lang || caller.options.defaultLanguage}", [${this.buffer.flush()}])`;
        }
        else {
            code = `await _execute_code("${kwargs.lang || caller.options.defaultLanguage}", [${this.buffer.flush()}])`;
        }
        caller.detach(this.buffer);
        return code;
    }
}
export { CodeTag };
//# sourceMappingURL=CodeTag.js.map