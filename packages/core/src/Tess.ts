interface TessProcedure {
	call: (args: { [key: string]: any }) => string;
}

import { TessGenerator } from "./TessGenerator.js";

class Tess {
	public static parse(input: string): TessProcedure {
		// When parsing a given document, tess will try to cache the results and provide possibilities to render them faster and more efficiently.
		// We can do this by using filler variables, which are just named global variables that can be interpolated once the procedure that generates the output is called.
		const generator = new TessGenerator();
		const out = generator.compile(input);
		const proc = new Function(`return ${out}`);

		return {
			call: (args: { [key: string]: any }) => {
				return proc()(args);
			},
		};
	}

	public static compile(input: string) {
		return Tess.parse(input).call({});
	}
}

export default Tess;
