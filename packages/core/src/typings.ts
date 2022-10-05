import { Tag } from "./Tag.js";

type Kwargs = {[key: string]: any};
type Args = any[];
type Environment = {[key: string]: Tag};

interface TagOptions {
	selfClosing?: boolean;
	rawArgumentString?: boolean;
}

type BeginCallback = (kwargs: Kwargs | string, args: Args) => string;
type EndCallback = (kwargs: Kwargs | string, args: Args) => string;

interface TessOptions {
	/**
	 * The language used as a default when no lang parameters is specified in `{#code}` blocks.
	 */
	defaultLanguage?: string;
}

export { Kwargs, Args, Environment, TagOptions, BeginCallback, EndCallback, TessOptions }