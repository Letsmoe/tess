import { CodeTag } from "./tags/CodeTag.js";
import { DefineCommand } from "./tags/DefineCommand.js";
import { EachTag } from "./tags/EachTag.js";
import { ElseIfTag } from "./tags/ElseIfTag.js";
import { ElseTag } from "./tags/ElseTag.js";
import { IfTag } from "./tags/IfTag.js";
import { LangCommand } from "./tags/LangCommand.js";
import { Environment } from "./typings.js";



const DEFAULT_ENVIRONMENT: Environment = {
	"each": EachTag,
	"if": IfTag,
	"define": DefineCommand,
	"elif": ElseIfTag,
	"else": ElseTag,
	"lang": LangCommand,
	"code": CodeTag
}

export { DEFAULT_ENVIRONMENT }