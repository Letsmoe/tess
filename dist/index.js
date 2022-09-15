var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import child_process from 'child_process';
import * as fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { log } from 'console';
const __dirname = dirname(fileURLToPath(import.meta.url));
const example = `
#lang python3
% let x = 5

Hello {{"World"}}!`;
class Tess {
    constructor() {
        this.scope = {};
        this.directives = {
            "define": (name, value) => {
                // First we need to parse the value.
                this.scope[name] = JSON.parse(value);
            },
            "lang": (language) => {
                this.lang = language;
            }
        };
        this.lang = "python";
    }
    compile(input) {
        return new Promise((resolve, reject) => {
            /**
             * The first lines of the content always contain information about the language to execute by default and some constants that should be defined at runtime.
             * Once we continue we might find code blocks that need to be executed.
             */
            input = input.replace(/\{\{(.*?)\}\}/g, (all, content) => {
                return `% console.log(${content})`;
            });
            const lines = input.split(/\r?\n/g);
            var output = [];
            let insideCodeBlock = false;
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                if (insideCodeBlock && !line.startsWith("%}")) {
                    output.push(line.replace(/`/g, "\\`"));
                    continue;
                }
                else if (line.startsWith("%}")) {
                    insideCodeBlock = false;
                    continue;
                }
                if (line[0] === "#") {
                    line = line.substring(1);
                    // We found a top-level command, let's execute it accordingly.
                    let args = line.split(" ");
                    let commandName = args[0];
                    let command = this.directives[commandName];
                    // The command name is still part of the args array, so we need to shift it.
                    args.shift();
                    if (command) {
                        command(...args);
                    }
                    else {
                        throw new Error("Call to undefined preprocessor directive " + commandName + " on line " + i);
                    }
                }
                else if (line[0] === "%") {
                    output.push(line.substring(1));
                }
                else if (line.startsWith("{%")) {
                    insideCodeBlock = true;
                    continue;
                }
                else {
                    output.push("console.log(`" + line.replace(/`/g, "\\`") + "`)");
                }
            }
            let out = "";
            let fileName = __dirname + "/" + Math.random().toString() + ".js";
            fs.writeFileSync(fileName, output.join("\n"));
            let proc = child_process.spawn("node", [fileName]);
            proc.stdout.on("data", (data) => {
                out += data;
            });
            proc.on("close", () => {
                resolve(out);
            });
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const exampleClass = new Tess();
    let result = yield exampleClass.compile(example);
    log(result);
}))();
