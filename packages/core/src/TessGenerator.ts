class TessGenerator {
	public constructor() {}

	/**
	 * A function that takes a string as input and returns the compiled string that can be converted to a function.
	 * @param input A string containing content that should be compiled to an output procedure.
	 */
	public compile(input: string): string {
		// First we need to check whether we actually have valid input.
		if (typeof input !== "string" || input.length === 0) {
			throw new Error(
				"Input must be of type string and must have a valid length."
			);
		}

		// If we are certain that we have a valid input we can start converting the input to an array of lines.
		// But before we can do that, we need to replace the tess supported multiline syntax (<?(.*?)?>) to single line syntax (% (.*?)).
		input = input.replace(/<%(.*?)>(.*?)<\/%>/gs, (all, props, content) => {
			// The "props" match will contain HTML properties that were assigned to the tess node. (e.g. "lang='javascript'")
			// We can parse them to JSON format.
			const obj = {};
			Array.from(props.matchAll(/([A-z]+)=(?:(?=")"([^"]+)"|([^= ]+))/g)).map(x => {
				obj[x[1]] = x[2];
			});
			// If the user set a "lang" property, we can use it to define the language we want to use for our file.
			
			return content
				.trim()
				.split("\n")
				.map((x: string) => "% " + x)
				.join("\n");
		});
		const lines = input.replace(/\r\n/g, "\n").split(/\n/);

		var output = [];

		for (let line of lines) {
			// This checks whether the first token of the given line is a percent sign, meaning we want to interpret the whole line as code.
			if (line.startsWith("%")) {
				output.push(line.substring(1).trim());
				continue;
			}
			// If the line is supposed to be plain old text, we want to replace all variable placeholders.
			// Since we're generating JS output from the input string, we can just use template literals and output a variable insertion inside a template literal string.

			const varInterpolated = line.replace(
				/\{(.*?)\}/g,
				(all, content) => {
					// Since we support some directives natively, we can check if the user wanted to use such directives like:
					// #each name in array
					// #if
					// And so on and so forth. Let's see if the first character matches the "#" sign.
					content = content.trim();
					if (content[0] === "#") {
						// We want to start a directive.
						
					}
				}
			);
			// We can then write this line into the output.
			output.push(
				`__o += \`${varInterpolated.replace(/(?<!\\)`/g, "\\`")}\\n\``
			);
		}

		// We want to generate some filler code, so that we can generate a js function from our output more easily.
		const out = `function (args) {
			for (let name in args) {
				this[name] = args[name];
			}
			var __o = "";
			${output.join("\n")}
			return __o;
		};`;

		return out.trim();
	}
}

export { TessGenerator }