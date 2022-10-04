#!/usr/bin/env node
import { colarg } from "colarg";
import * as fs from "fs";
import { Tess } from "@tess/core";
import path from "path";
function resolveRelative(from, to) {
    return path.join(process.cwd(), path.relative(from, to));
}
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
    args: []
}, (args) => {
    // Get the path to a config file.
    const config = path.join(process.cwd(), (args.default && args.default.length > 0) ? args.default[0] : "./tessconfig.json");
    // Check if the config file exists
    const configDir = path.dirname(config);
    if (fs.existsSync(config)) {
        // Read the config file
        const content = fs.readFileSync(config, "utf8");
        // Convert to JSON object.
        const json = JSON.parse(content);
        // Get all the needed settings from the config object.
        var { rootDir, outDir } = json;
        // The root and out directories will be relative to the config file, let's change them to be absolute.
        rootDir = resolveRelative(configDir, rootDir);
        outDir = resolveRelative(configDir, outDir);
        // Check if all the necessary settings have been specified.
        if (rootDir && outDir) {
            // Read the root directory and get all the files.
            const files = fs.readdirSync(rootDir);
            var i = 0;
            files.forEach(file => {
                // Check if it is a .tess file and the file exists.
                let filePath = path.join(rootDir, file);
                if (file.match(/\.tess/g) && fs.existsSync(filePath)) {
                    // Read the file
                    const fileContent = fs.readFileSync(filePath).toString();
                    // Run the compiler on it.
                    const converter = new Tess();
                    converter.compile(fileContent);
                    // Get the output
                    converter.render({}).then(output => {
                        // Write the output to the file with the same name in the output directory.
                        // But since tess is a compiler the file name will look like this: main.tess.html
                        // We first need to remove the ".tess" from it.
                        let outputPath = path.join(outDir, file.replace(/\.tess/g, ""));
                        fs.writeFileSync(outputPath, output);
                        if (i++ == files.length - 1) {
                            process.exit();
                        }
                    });
                }
            });
        }
    }
});
parser.enableHelp();
const args = parser.getArgs();
//# sourceMappingURL=index.js.map