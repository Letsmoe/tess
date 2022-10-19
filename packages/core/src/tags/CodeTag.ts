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
		this.buffer.onAdd = (value: string, buffer: string[]) => {
			buffer[buffer.length - 1] = JSON.parse(value)
		}
		caller.attach(this.buffer);
	}

	public onTagEnd(kwargs: Kwargs, args?: Args, caller?: Tess): string | void {
		caller.detach(this.buffer);
		if (kwargs.var) {
			return `let ${kwargs.var} = await _execute_code("${kwargs.lang || caller.options.defaultLanguage}", [${this.buffer.flush()}])`;
		} else {
			return `await _execute_code("${kwargs.lang || caller.options.defaultLanguage}", [${this.buffer.flush()}])`;
		}
		
	}
}

export { CodeTag }