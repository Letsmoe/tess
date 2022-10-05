import { Tag } from "./Tag.js";

const TAG_EACH = new Tag("each", () => {}, { rawArgumentString: true, selfClosing: false }, (str: string) => {
	return `for (${str}) {`
}, (str: string) => {
	return "}";
});

const TAG_IF = new Tag("if", () => {}, { rawArgumentString: true, selfClosing: false }, (str: string) => {
	return `if (${str}) {`;
}, (str: string) => {	
	return "}";
});

const COMMAND_DEFINE = new Tag("define", () => {}, { selfClosing: true, rawArgumentString: false }, (kwargs, args) => {
	return `const ${args[0]} = "${args[1]}";`;
}, () => {
	return "";
})

const COMMAND_LANG = new Tag("lang", (options, lang) => {
	options.defaultLanguage = lang as string;
}, { selfClosing: true, rawArgumentString: true })

const TAG_ELIF = new Tag("elif", () => {}, { selfClosing: true, rawArgumentString: true }, (str: string) => {
	return `} else if (${str}) {`
})

const TAG_ELSE = new Tag("else", () => {}, { selfClosing: true, rawArgumentString: true }, (str: string) => {
	return `} else {`;
});

const DEFAULT_ENVIRONMENT = {
	"each": TAG_EACH,
	"if": TAG_IF,
	"define": COMMAND_DEFINE,
	"elif": TAG_ELIF,
	"else": TAG_ELSE,
	"lang": COMMAND_LANG
}

export { DEFAULT_ENVIRONMENT }