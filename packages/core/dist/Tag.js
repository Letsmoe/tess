class Tag {
    constructor(name = "", options = {}) {
        this.name = name;
        this.options = options;
        this.options = Object.assign({
            selfClosing: false,
            rawArgumentString: false,
        }, this.options);
        if (this.options.selfClosing) {
            // This tag is self-closing, meaning that it will not need an end tag.
            // Like this: {#block arg kwarg=""} 
        }
    }
    onUse(options, kwargs, ...args) { }
    /**
     * A function that is called once a matching tag has been found.
     * It should return a string in JS format which can be executed later on.
     * @returns A string which will be inserted at the beginning of the tag, this will end up in the compiled code.
     */
    onTagStart(kwargs, args, caller) {
        return "";
    }
    /**
     * A function that is called once a matching tag has ended.
     * It should return a string in JS format which can be executed later on.
     * @param kwargs An object containing keyword arguments which were passed to the directive.
     * @param args A list of arguments which were passed to the directive.
     * @returns A string which will be inserted at the end of the tag, this will end up in the compiled code.
     */
    onTagEnd(kwargs, args, caller) {
        return "";
    }
}
export { Tag };
//# sourceMappingURL=Tag.js.map