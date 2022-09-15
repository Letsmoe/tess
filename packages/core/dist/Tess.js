import { TessGenerator } from "./TessGenerator.js";
var Tess = /** @class */ (function () {
    function Tess() {
    }
    Tess.parse = function (input) {
        // When parsing a given document, tess will try to cache the results and provide possibilities to render them faster and more efficiently.
        // We can do this by using filler variables, which are just named global variables that can be interpolated once the procedure that generates the output is called.
        var generator = new TessGenerator();
        var out = generator.compile(input);
        var proc = new Function("return ".concat(out));
        return {
            call: function (args) {
                return proc()(args);
            }
        };
    };
    Tess.compile = function (input) {
        return Tess.parse(input).call({});
    };
    return Tess;
}());
export default Tess;
