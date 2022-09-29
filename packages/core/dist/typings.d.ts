import { Tag } from "./Tag.js";
declare type Kwargs = {
    [key: string]: any;
};
declare type Args = any[];
declare type Environment = {
    [key: string]: Tag;
};
interface TagOptions {
    selfClosing?: boolean;
    rawArgumentString?: boolean;
}
declare type BeginCallback = (kwargs: Kwargs | string, args: Args) => string;
declare type EndCallback = (kwargs: Kwargs | string, args: Args) => string;
export { Kwargs, Args, Environment, TagOptions, BeginCallback, EndCallback };
