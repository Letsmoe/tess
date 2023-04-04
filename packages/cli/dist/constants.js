import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import os from "node:os";
// Get the version from the package.json file.
const { version } = JSON.parse(fs.readFileSync(__dirname + "/../package.json").toString());
// Split version into major, minor and patch version.
const [major, minor, patch] = version.split(".");
const createVersionId = (major, minor, patch) => {
    const pad = (x, factor) => parseInt(x.padStart(3, "0")) * factor;
    return pad(major, 10e5) + pad(minor, 10e2) + pad(patch, 1);
};
export const DEFAULT_CONSTANTS = Object.assign(Object.assign({ TESS_EOL: os.EOL, TESS_CR: "\r", TESS_LF: "\n", TESS_VERSION: version, TESS_MAJOR_VERSION: major, TESS_MINOR_VERSION: minor, TESS_PATCH_VERSION: patch, TESS_VERSION_ID: createVersionId(major, minor, patch) }, os.constants), { __HOME__: os.homedir(), __OS__: os.platform(), __TMP__: os.tmpdir(), __OS_TYPE__: os.type(), __ARCHITECTURE__: os.arch() });
//# sourceMappingURL=constants.js.map