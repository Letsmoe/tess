import * as fs from "fs";
import { Tess } from "@tess-engine/core";
import path from "path";
import { Markdown } from "../environments/markdown.js";
function resolveRelative(from, to) {
    return path.join(process.cwd(), path.relative(from, to));
}
function renameFile(fileName) {
    return fileName.replace(/\.tess/g, "");
}
export function compile(args) {
    // We need to check whether we only need to compile a single file, or base the compilation on a config file.
    if (args.default && (args.default.length > 0)) {
        // We only want to compile a single file.
        const filePath = path.join(process.cwd(), args.default[0]);
        // Check if a specific outPath was given, else we rewrite the filename and output it alongside the original.
        let outPath = args.out ? path.join(process.cwd(), args.out) : renameFile(filePath);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath).toString();
            // Check if the output file may already exist, then we would throw an error, saying that you need to force removal of the original.
            if (fs.existsSync(outPath) && !args.force) {
                console.log("Output file already exists, add the --force flag to force removal of the original.");
            }
            else {
                compileContent(content, filePath).then(result => {
                    fs.writeFileSync(outPath, result);
                });
            }
        }
    }
    else {
        // Get the path to a config file.
        const config = path.join(process.cwd(), args.config || "./tessconfig.json");
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
                        compileContent(fileContent, filePath, {}).then(result => {
                            // Write the output to the file with the same name in the output directory.
                            // But since tess is a compiler the file name will look like this: main.tess.html
                            // We first need to remove the ".tess" from it.
                            let outputPath = path.join(outDir, file.replace(/\.tess/g, ""));
                            fs.writeFileSync(outputPath, result);
                            if (i++ == files.length - 1) {
                                process.exit();
                            }
                        });
                    }
                });
            }
        }
    }
}
function compileContent(content, fileName = null, environment = {}) {
    return new Promise((resolve, reject) => {
        const converter = new Tess();
        converter.compile(content);
        // Get the output
        converter.render(Object.assign(environment, {
            __FILE__: fileName,
            Markdown: new Markdown(content)
        })).then((output) => {
            resolve(output);
        });
    });
}
//# sourceMappingURL=compile.js.map