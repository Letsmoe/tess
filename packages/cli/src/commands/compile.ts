import * as fs from "fs";
import { Tess } from "@tess-engine/core";
import path from "path";
import { MarkdownExtension } from "../environments/markdown.js";
import { Config } from "../typings/config.js";
import { recursivelyIterateDirectory } from "../recursivelyIterateDirectory.js";
import { DEFAULT_CONSTANTS } from "../defaults/constants.js";
import { DEFAULT_METHODS } from "../defaults/methods.js";
import { DEFAULT_CONFIG } from "../defaults/config.js";

declare global {
	interface Console {
		fatal: (message: string, code?: number) => {};
	}
}

console.fatal = function (message: string, code: number = 1) {
	console.log(message);
	process.exit(code);
};

function resolveRelative(from: string, to: string): string {
	return path.join(process.cwd(), path.relative(from, to));
}

function renameFile(fileName: string) {
	return fileName.replace(/\.tess/g, "");
}

export async function compile(args: {
	default: string[];
	config?: string;
	out?: string;
	force?: boolean;
}) {
	// We need to check whether we only need to compile a single file, or base the compilation on a config file.
	if (args.default && args.default.length > 0) {
		// We only want to compile a single file.
		const filePath = path.join(process.cwd(), args.default[0]);
		// Check if a specific outPath was given, else we rewrite the filename and output it alongside the original.
		let outPath = args.out
			? path.join(process.cwd(), args.out)
			: renameFile(filePath);
		if (fs.existsSync(filePath)) {
			let content = fs.readFileSync(filePath).toString();

			// Check if the output file may already exist, then we would throw an error, saying that you need to force removal of the original.
			if (fs.existsSync(outPath) && !args.force) {
				console.fatal(
					"Output file already exists, add the --force flag to force removal of the original."
				);
			}
			compileContent(content, {
				__FILE__: filePath,
				__DIR__: path.dirname(filePath),
				...DEFAULT_CONSTANTS,
				...DEFAULT_METHODS
			}).then((result) => {
				fs.writeFileSync(outPath, result);
			});
		}
	} else {
		// Get the path to a config file.
		const config = path.join(
			process.cwd(),
			args.config || "./tessconfig.json"
		);
		// Check if the config file exists
		const configDir = path.dirname(config);
		if (!fs.existsSync(config)) {
			console.fatal(
				"The configuration file could not be found in the specified location. Use --config to set the configuration file path."
			);
		}
		// Read the config file
		const content = fs.readFileSync(config, "utf8");
		// Convert to JSON object.
		var json: Config = JSON.parse(content);
		json = Object.assign(DEFAULT_CONFIG, json);
		// Get all the needed settings from the config object.
		var { rootDir, outDir, defaultLanguage } = json;
		// The root and out directories will be relative to the config file, let's change them to be absolute.
		rootDir = resolveRelative(configDir, rootDir);
		outDir = resolveRelative(configDir, outDir);
		// Check if all the necessary settings have been specified.
		if (rootDir && outDir) {
			// Read the root directory recursively and compile all the files.
			const files = recursivelyIterateDirectory(rootDir);
			var i = 0;
			for (const file of files) {
				// Check if it is a .tess file and the file exists.
				if (file.match(/\.tess/g) && fs.existsSync(file)) {
					// Read the file
					const fileContent = fs.readFileSync(file).toString();
					// Run the compiler on it.
					compileContent(
						fileContent,
						{
							__FILE__: file,
							__DIR__: path.dirname(file),
							...DEFAULT_CONSTANTS,
							...DEFAULT_METHODS
						},
						{},
						{
							defaultLanguage
						}
					).then((result) => {
						// Write the output to the file with the same name in the output directory.
						// But since tess is a compiler the file name will look like this: main.tess.html
						// We first need to remove the ".tess" from it.
						let outputPath = path.join(
							outDir,
							file.replace(/\.tess/g, "")
						);
						fs.writeFileSync(outputPath, result);

						if (i++ == files.length - 1) {
							process.exit();
						}
					});
				}
			}
		}
	}
}

async function compileContent(
	content: string,
	variables: { [key: string]: any; },
	environment: { [key: string]: any } = {},
	options: Tess["options"] = {}
): Promise<string> {
	const converter = new Tess(options);
	converter.compile(content);
	// Get the output
	environment = {
		...environment,
		...variables,
		Markdown: new MarkdownExtension(content),
	};
	return await converter.render(environment);
}
