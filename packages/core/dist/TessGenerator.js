var TessGenerator = /** @class */ (function () {
    function TessGenerator() {
    }
    /**
     * A function that takes a string as input and returns the compiled string that can be converted to a function.
     * @param input A string containing content that should be compiled to an output procedure.
     */
    TessGenerator.prototype.compile = function (input) {
        // First we need to check whether we actually have valid input.
        if (typeof input !== "string" || input.length === 0) {
            throw new Error("Input must be of type string and must have a valid length.");
        }
        // If we are certain that we have a valid input we can start converting the input to an array of lines.
        // But before we can do that, we need to replace the tess supported multiline syntax (<?(.*?)?>) to single line syntax (% (.*?)).
        input = input.replace(/<%(.*?)>(.*?)<\/%>/gs, function (all, props, content) {
            // The "props" match will contain HTML properties that were assigned to the tess node. (e.g. "lang='javascript'")
            // We can parse them to JSON format.
            var obj = {};
            Array.from(props.matchAll(/([A-z]+)=(?:(?=")"([^"]+)"|([^= ]+))/g)).map(function (x) {
                obj[x[1]] = x[2];
            });
            // If the user set a "lang" property, we can use it to define the language we want to use for our file.
            return content
                .trim()
                .split("\n")
                .map(function (x) { return "% " + x; })
                .join("\n");
        });
        var lines = input.replace(/\r\n/g, "\n").split(/\n/);
        var output = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            // This checks whether the first token of the given line is a percent sign, meaning we want to interpret the whole line as code.
            if (line.startsWith("%")) {
                output.push(line.substring(1).trim());
                continue;
            }
            // If the line is supposed to be plain old text, we want to replace all variable placeholders.
            // Since we're generating JS output from the input string, we can just use template literals and output a variable insertion inside a template literal string.
            var varInterpolated = line.replace(/\{(.*?)\}/g, function (all, content) {
                // Since we support some directives natively, we can check if the user wanted to use such directives like:
                // #each name in array
                // #if
                // And so on and so forth. Let's see if the first character matches the "#" sign.
                content = content.trim();
                if (content[0] === "#") {
                    // We want to start a directive.
                }
            });
            // We can then write this line into the output.
            output.push("__o += `".concat(varInterpolated.replace(/(?<!\\)`/g, "\\`"), "\\n`"));
        }
        // We want to generate some filler code, so that we can generate a js function from our output more easily.
        var out = "function (args) {\n\t\t\tfor (let name in args) {\n\t\t\t\tthis[name] = args[name];\n\t\t\t}\n\t\t\tvar __o = \"\";\n\t\t\t".concat(output.join("\n"), "\n\t\t\treturn __o;\n\t\t};");
        return out.trim();
    };
    return TessGenerator;
}());
export { TessGenerator };
