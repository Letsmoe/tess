declare class CodeBuilder {
    private code;
    constructor();
    /**
     * Add a line of source to the code.
     * @param line The line to add
     */
    addLine(line: string): void;
    /**
     * Add a section, a sub-CodeBuilder.
     */
    addSection(): CodeBuilder;
    toString(): string;
    /**
     * Execute the code, and return a dict of globals it defines.
     */
    getRenderFunction(context: {
        [key: string]: any;
    }): any;
}
export { CodeBuilder };
