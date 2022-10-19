import { Tag } from "../Tag.js";

class EachTag extends Tag {
	constructor() {
		super("each", { selfClosing: false, rawArgumentString: true })
	}

	public onTagStart(str: string): string {
		return `for (${str}) {`
	}

	public onTagEnd(): string {
		return "}"
	}
}

export { EachTag }