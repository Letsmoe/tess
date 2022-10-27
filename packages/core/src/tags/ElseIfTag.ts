import { Tag } from "../Tag.js";

class ElseIfTag extends Tag {
	constructor() {
		super("elif", { selfClosing: true, rawArgumentString: true })
	}

	public onTagStart(str: string): string {
		return `} else if (${str}) {`;
	}
}

export { ElseIfTag }