import { Tag } from "./Tag.js";
const TAG_EACH = new Tag("each", () => { }, { rawArgumentString: true, selfClosing: false }, (str) => {
    return `for (${str}) {`;
}, (str) => {
    return "}";
});
const TAG_IF = new Tag("if", () => { }, { rawArgumentString: true, selfClosing: false }, (str) => {
    return `if (${str}) {`;
}, (str) => {
    return "}";
});
const TAG_DEFINE = new Tag("define", () => { }, { selfClosing: true, rawArgumentString: false }, (kwargs, args) => {
    return `const ${args[0]} = "${args[1]}";`;
}, () => {
    return "";
});
const TAG_ELIF = new Tag("elif", () => { }, { selfClosing: true, rawArgumentString: true }, (str) => {
    return `} else if (${str}) {`;
});
const TAG_ELSE = new Tag("else", () => { }, { selfClosing: true, rawArgumentString: true }, (str) => {
    return `} else {`;
});
const DEFAULT_ENVIRONMENT = {
    "each": TAG_EACH,
    "if": TAG_IF,
    "define": TAG_DEFINE,
    "elif": TAG_ELIF,
    "else": TAG_ELSE
};
export { DEFAULT_ENVIRONMENT };
//# sourceMappingURL=Environment.js.map