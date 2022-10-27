import { Tag } from "../Tag.js";
import { Tess } from "../Tess.js";
import { TextBuffer } from "../TextBuffer.js";
import { Args, Kwargs } from "../typings.js";

class CodeTag extends Tag {
	private buffer: TextBuffer;
	public constructor() {
		super("code", { selfClosing: false, rawArgumentString: false});
	}

	public onTagStart(kwargs: string | Kwargs, args?: Args, caller?: Tess): string | void {
		this.buffer = new TextBuffer();
		caller.attach(this.buffer);
	}

	public onTagEnd(kwargs: Kwargs, args?: Args, caller?: Tess): string | void {
		let code = "";
		if (kwargs.var) {
			code = `let ${kwargs.var} = await _execute_code("${kwargs.lang || caller.options.defaultLanguage}", [${this.buffer.flush()}])`;
		} else {
			code = `await _execute_code("${kwargs.lang || caller.options.defaultLanguage}", [${this.buffer.flush()}])`;
		}
		caller.detach(this.buffer);
		return code;
	}
}

export { CodeTag }