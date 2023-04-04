import path from "path";
import * as fs from "fs";
import { Tag } from "../Tag.js";
class IncludeCommand extends Tag {
    constructor() {
        super("include", { selfClosing: true, rawArgumentString: false });
    }
    onTagStart(kwargs, args, caller) {
        // Get the file and append it to the current code.
        let filePath = path.join(process.cwd(), args[0]);
        if (fs.existsSync(filePath)) {
            let text = fs.readFileSync(filePath).toString();
            // Disable the wrapper.
            return `extend_result(\`${text.replace(/`/g, "\\`")}\`);`;
        }
        else {
            throw new Error("File does not exist: " + filePath);
        }
    }
}
export { IncludeCommand };
//# sourceMappingURL=IncludeCommand.js.map