import * as fs from "fs";
import * as path from "path";
export function recursivelyIterateDirectory(dir) {
    const content = fs.readdirSync(dir);
    const found = [];
    for (const item of content) {
        const uri = path.join(dir, item);
        // Check if we're dealing with a file or folder.
        if (fs.lstatSync(uri).isDirectory()) {
            found.push(...recursivelyIterateDirectory(uri));
        }
        else {
            found.push(uri);
        }
    }
    return found;
}
//# sourceMappingURL=recursivelyIterateDirectory.js.map