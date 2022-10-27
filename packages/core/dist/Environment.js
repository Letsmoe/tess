import { CodeTag } from "./tags/CodeTag.js";
import { DefineCommand } from "./tags/DefineCommand.js";
import { EachTag } from "./tags/EachTag.js";
import { ElseIfTag } from "./tags/ElseIfTag.js";
import { ElseTag } from "./tags/ElseTag.js";
import { IfTag } from "./tags/IfTag.js";
import { IncludeCommand } from "./tags/IncludeCommand.js";
import { LangCommand } from "./tags/LangCommand.js";
import { RequireCommand } from "./tags/RequireCommand.js";
const DEFAULT_ENVIRONMENT = {
    "each": EachTag,
    "if": IfTag,
    "define": DefineCommand,
    "elif": ElseIfTag,
    "else": ElseTag,
    "lang": LangCommand,
    "code": CodeTag,
    "include": IncludeCommand,
    "require": RequireCommand,
};
export { DEFAULT_ENVIRONMENT };
//# sourceMappingURL=Environment.js.map