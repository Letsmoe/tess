import { Tag } from "./Tag.js";
import { Args, Kwargs, TagOptions } from "./typings.js";

class SelfClosingTag extends Tag {
	constructor(name: string, callback: (kwargs: Kwargs, args: Args) => any, options: TagOptions) {
		super(name, callback, Object.assign(options, {selfClosing: true}));
	}
}

export { SelfClosingTag };