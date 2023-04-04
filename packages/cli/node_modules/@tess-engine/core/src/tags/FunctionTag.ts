import { Tag } from "../Tag.js";
import { Tess } from "../Tess.js";
import { TextBuffer } from "../TextBuffer.js";
import { Args, Kwargs } from "../typings.js";

class FunctionTag extends Tag {
	private buffer: TextBuffer;
	public constructor() {
		super("function", { selfClosing: false, rawArgumentString: true });
	}

	public onTagStart(kwargs: string | Kwargs, args?: Args, caller?: Tess): void {
		this.buffer = new TextBuffer();
		caller.attach(this.buffer);
	}

	public onTagEnd(kwargs: Kwargs, args?: Args, caller?: Tess): string {
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

export { FunctionTag }