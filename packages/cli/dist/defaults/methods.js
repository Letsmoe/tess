import fs from "fs";
import path from 'path';
export const DEFAULT_METHODS = {
    read: fs.readFileSync,
    write: fs.writeFileSync,
    readdir: fs.readdirSync,
    exists: fs.existsSync,
    join: (delimiter, ...args) => args.join(delimiter),
    path,
    int: parseInt,
    float: parseFloat,
    object: JSON.parse,
    json: JSON.stringify,
};
//# sourceMappingURL=methods.js.map