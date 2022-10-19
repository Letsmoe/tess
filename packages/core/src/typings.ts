import { Tag } from "./Tag.js";
import { Tess } from "./Tess.js";

type Kwargs = {[key: string]: any};
type Args = any[];
type Environment = {[key: string]: Tag};

interface TagOptions {
	selfClosing?: boolean;
	rawArgumentString?: boolean;
}

type BeginCallback = (kwargs: Kwargs | string, args: Args, caller: Tess) => string;
type EndCallback = (kwargs: Kwargs | string, args: Args, caller: Tess) => string;

interface TessOptions {
	/**
	 * The language used as a default when no lang parameters is specified in `{#code}` blocks.
	 */
	defaultLanguage?: string;
	/**
	 * Whether to generate the default preamble and postamble.
	 */
	generateWrapper?: boolean;
}

export { Kwargs, Args, Environment, TagOptions, BeginCallback, EndCallback, TessOptions }