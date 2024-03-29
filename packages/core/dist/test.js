import { Tess, setGlobalHandler } from "./Tess.js";
import { LanguageHandler } from "./LanguageHandler.js";
const jsHandler = new LanguageHandler(["js", "javascript"]);
jsHandler.execute = (code) => {
    return new Promise((resolve, reject) => {
        let func = new Function(code.join("\n"));
        resolve(func());
    });
};
setGlobalHandler(jsHandler);
let engine = new Tess({ defaultLanguage: "javascript" });
engine.compile(`
{#each i in [1,2,3] #}
{{i}}
{/each/}
`);
let output = await engine.render({
    "__HEADINGS__": [
        "Why you don't suck!",
        "What you're up to."
    ],
    topics: ["Juggling"],
    upper: (x) => x.toUpperCase(),
    table_of_contents: (content) => {
        return content.map(x => `<h1>${x}</h1>`).join("");
    }
});
console.log(output);
//# sourceMappingURL=test.js.map