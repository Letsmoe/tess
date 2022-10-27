import { Tag } from "../Tag.js";

class IfTag extends Tag {
	constructor() {
		super("if", { selfClosing: false, rawArgumentString: true })
	}

	public onTagStart(str: string): string {
		return `for (${str}) {`;
	}

	public onTagEnd(): string {
		return "}"
	}
}

export { IfTag }