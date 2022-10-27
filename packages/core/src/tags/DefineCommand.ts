import { Tag } from "../Tag.js";

class DefineCommand extends Tag {
	constructor() {
		super("define", { selfClosing: true, rawArgumentString: false })
	}

	public onTagStart(kwargs: string, args: any[]): string {
		return `const ${args[0]} = "${args[1]}";`;
	}
}

export { DefineCommand }