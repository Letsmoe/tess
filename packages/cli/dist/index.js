#!/usr/bin/env node
import { colarg } from "colarg";
import { compile } from "./commands/compile.js";
let parser = new colarg(process.argv.slice(2));
parser.addOption({
    name: "template",
    alias: "t",
    defaults: "",
    description: "Which template to use.",
    required: false,
    type: "string"
});
parser.addCommand({
    name: "compile",
    description: "Reads a tess config file and runs the compiler based on the settings of the config.",
    args: [{
            name: "config",
            alias: "p",
            defaults: "./tessconfig.json",
            description: "The config file to use for the compilation.",
            required: false,
            type: "string"
        }, {
            name: "out",
            alias: "o",
            description: "The file name to write the output to.",
            required: false,
            type: "string",
            defaults: ""
        }, {
            name: "force",
            alias: "f",
            description: "Whether to force the removal of original files.",
            required: false,
            type: "boolean",
            defaults: ""
        }]
}, compile);
parser.enableHelp();
const args = parser.getArgs();
//# sourceMappingURL=index.js.map