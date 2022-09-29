#!/usr/bin/env node

import { colarg } from "colarg";
import * as fs from "fs";
import { Tess } from "@tess/core"

let parser = new colarg(process.argv.slice(2));

parser.addOption({
	name: "template",
	alias: "t",
	defaults: "",
	description: "Which template to use.",
	required: false,
	type: "string"
});

parser.enableHelp();

const args = parser.getArgs();

const INPUT_FILE = process.cwd() + "/" + args.default[0];
const CONTENT = fs.readFileSync(INPUT_FILE, "utf8");


const converter = new Tess();

converter.compile(CONTENT);

const output = await converter.render({})
console.log(output);