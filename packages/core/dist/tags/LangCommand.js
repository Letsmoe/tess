import { Tag } from "../Tag.js";
class LangCommand extends Tag {
    constructor() {
        super("lang", { selfClosing: true, rawArgumentString: true });
    }
    onUse(options, lang) {
        options.defaultLanguage = lang;
    }
}
export { LangCommand };
//# sourceMappingURL=LangCommand.js.map