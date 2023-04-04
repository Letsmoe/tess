import path from "path";
import * as fs from "fs";
import { Tag } from "../Tag.js";
import { Tess } from "../Tess.js";
class RequireCommand extends Tag {
    constructor() {
        super("require", { selfClosing: true, rawArgumentString: false });
    }
    onTagStart(kwargs, args, caller) {
        // Get the options and environment from the caller so we can generate a new Tess instance.
        let options = caller.getOptions();
        let environment = caller.getEnvironment();
        options.generateWrapper = false;
        // Create a new instance.
        let callerCopy = new Tess(options, environment);
        let filePath = path.join(process.cwd(), args[0]);
        if (fs.existsSync(filePath)) {
            let text = fs.readFileSync(filePath).toString();
            // Disable the wrapper.
            callerCopy.compile(text);
            let result = callerCopy.getCode();
            return result;
        }
        else {
            throw new Error("File does not exist: " + filePath);
        }
    }
}
export { RequireCommand };
//# sourceMappingURL=RequireCommand.js.map