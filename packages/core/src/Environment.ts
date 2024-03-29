import { CodeTag } from "./tags/CodeTag.js";
import { MacroTag } from "./tags/MacroTag.js";
import { DefineCommand } from "./tags/DefineCommand.js";
import { EachTag } from "./tags/EachTag.js";
import { ElseIfTag } from "./tags/ElseIfTag.js";
import { ElseTag } from "./tags/ElseTag.js";
import { IfTag } from "./tags/IfTag.js";
import { IncludeCommand } from "./tags/IncludeCommand.js";
import { LangCommand } from "./tags/LangCommand.js";
import { RequireCommand } from "./tags/RequireCommand.js";
import { Environment } from "./typings.js";
import { FunctionTag } from "./tags/FunctionTag.js";



const DEFAULT_ENVIRONMENT: Environment = {
	"each": EachTag,
	"function": FunctionTag,
	"macro": MacroTag,
	"if": IfTag,
	"define": DefineCommand,
	"elif": ElseIfTag,
	"else": ElseTag,
	"lang": LangCommand,
	"code": CodeTag,
	"include": IncludeCommand,
	"require": RequireCommand,
}

export { DEFAULT_ENVIRONMENT }