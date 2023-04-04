import { Tag } from "../Tag.js";

class ElseTag extends Tag {
	constructor() {
		super("else", { selfClosing: true, rawArgumentString: true })
	}

	public onTagStart(): string {
		return `} else {`;
	}
}

export { ElseTag }