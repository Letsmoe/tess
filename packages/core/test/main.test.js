import { Tess } from "../dist/index.js";

const input = `
<% lang="javascript">
	const NAME = "Moritz Utcke";
	const ARRAY = [NAME, "Sven Utcke"];
</%>

<% lang="python" type="module" var="greeting">
	def sayHello():
		return "Hello, world!"
	
	return sayHello()
</%>

{greeting}

{#each name in ARRAY}
	{#if name.startsWith("Moritz")}
		<h1>Der Coole {name}</h1>
	{:else}
		<h2>Der Müde {name}</h2>
	{/if}
{/each}
`

// Expected output
`
Hello, world!
<h1>Der Coole Moritz Utcke</h1>
<h2>Der Müde Sven Utcke</h2>
`

// Expected intermediate output

`
function() {
	var __o = "";
	const NAME = "Moritz Utcke";
	const ARRAY = [NAME, "Sven Utcke"];

	var greeting = __invoke_module("python", \`
		def sayHello():
			return "Hello, world!"

		return sayHello()
	\`);

	for (let name of ARRAY) {
		if (name.startsWith("Moritz")) {
			__o += \`<h1>Der Coole \${name}\n</h1>\`; 
		} else {
			__o += \`<h2>Der Müde \${name}\n</h2>\`;
		}
	}

	return __o;
}
`


//let output = Tess.compile(input);

console.log(output);