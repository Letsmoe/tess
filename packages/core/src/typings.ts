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

export { Kwargs, Args, Environment, TagOptions, BeginCallback, EndCallback }