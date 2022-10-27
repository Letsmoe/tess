import { Tag } from "../Tag.js";
class DefineCommand extends Tag {
    constructor() {
        super("define", { selfClosing: true, rawArgumentString: false });
    }
    onTagStart(kwargs, args) {
        return `const ${args[0]} = "${args[1]}";`;
    }
}
export { DefineCommand };
//# sourceMappingURL=DefineCommand.js.map