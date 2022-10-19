import { Tag } from "../Tag.js";
import { TessOptions } from "../typings.js";

class LangCommand extends Tag {
	constructor() {
		super("lang", { selfClosing: true, rawArgumentString: true })
	}

	public onUse(options: TessOptions, lang: string): void {
		options.defaultLanguage = lang;
	}
}

export { LangCommand }