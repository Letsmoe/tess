import { Tag } from "../Tag.js";
import { Tess } from "../Tess.js";
import { TextBuffer } from "../TextBuffer.js";
import { Args, Kwargs } from "../typings.js";

class MacroTag extends Tag {
	private buffer: TextBuffer;
	public constructor() {
		super("macro", { selfClosing: false, rawArgumentString: true });
	}

	public onTagStart(kwargs: string | Kwargs, args?: Args, caller?: Tess): void {
		this.buffer = new TextBuffer();
		caller.attach(this.buffer);
		return;
	}

	public onTagEnd(kwargs: Kwargs, args?: Args, caller?: Tess): string {
		const code = this.buffer.flushArray().join("+").trim();
		caller.detach(this.buffer);
		return `function ${kwargs} {
			return ${code}
		}`;
	}
}

export { MacroTag }