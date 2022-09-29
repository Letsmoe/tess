import { Args, BeginCallback, EndCallback, Kwargs, TagOptions } from "./typings.js";

class Tag {
	constructor(public name: string, public callback: (kwargs: Kwargs | string, ...args: Args) => any, public options: TagOptions = {}, onBegin: BeginCallback = () => "", onEnd: EndCallback = () => "") {
		this.options = Object.assign({
			selfClosing: false,
			rawArgumentString: false,
		}, this.options)

		if (this.options.selfClosing) {
			// This tag is self-closing, meaning that it will not need an end tag.
			// Like this: {#block arg kwarg=""} 
		}

		this.onBegin = onBegin;
		this.onEnd = onEnd;
	}

	/**
	 * A function that is called once a matching tag has been found.
	 * It should return a string in JS format which can be executed later on.
	 * @returns A string which will be inserted at the beginning of the tag, this will end up in the compiled code.
	 */
	public onBegin(kwargs: Kwargs | string, args?: Args): string {
		return "";
	}

	/**
	 * A function that is called once a matching tag has ended.
	 * It should return a string in JS format which can be executed later on.
	 * @param kwargs An object containing keyword arguments which were passed to the directive.
	 * @param args A list of arguments which were passed to the directive.
	 * @returns A string which will be inserted at the end of the tag, this will end up in the compiled code.
	 */
	public onEnd(kwargs: Kwargs | string, args?: Args): string {
		return "";
	}
}

export { Tag }