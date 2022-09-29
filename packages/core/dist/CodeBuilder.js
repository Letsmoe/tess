class CodeBuilder {
    constructor() {
        this.code = [];
        this.code = [];
    }
    /**
     * Add a line of source to the code.
     * @param line The line to add
     */
    addLine(line) {
        this.code.push(line + "\n");
    }
    /**
     * Add a section, a sub-CodeBuilder.
     */
    addSection() {
        let section = new CodeBuilder();
        this.code.push(section);
        return section;
    }
    toString() {
        return this.code.map((x) => x.toString()).join("");
    }
    /**
     * Execute the code, and return a dict of globals it defines.
     */
    getRenderFunction(context) {
        // A check that the caller really finished all the blocks they started.
        // Get the JS source as a single string.
        let source = this.toString();
        source = source.replace(/\%s/, `{${Object.keys(context).join(", ")}}`);
        let func = new Function(source);
        return func();
    }
}
export { CodeBuilder };
//# sourceMappingURL=CodeBuilder.js.map