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
{#define name "awd"}

{#if name == "Letsmoe"}
Letsmoe {{name}}!
{:elif name == "John"}
John {{name}}!
{:else}
Hey there, {{name}}!
{/if}

{#each topic of topics}
You like doing {{upper(topic)}}?
{/each}

{#code var="x"}
x = 5;
return x;
{/code}

{{x}}
`);
let output = await engine.render({
    topics: ["Juggling"],
    upper: (x) => x.toUpperCase(),
});
console.log(output);
//# sourceMappingURL=test.js.map