class MarkdownExtension {
    constructor(content) {
        this.content = "";
        this.content = content;
    }
    TOC() {
        // Match all headings and create a list with summarized information about them.
        const list = [];
        // We don't want to match anything inside a `code` block, let's remove them first.
        let content = this.content.replace(/^```[\s\S]*?\n```/mg, "");
        content.replace(/^(#+)(.*$)/gm, (match, level, name) => {
            level = level.length;
            name = name.trim();
            list.push({
                level,
                id: name.toLowerCase().replace(/[^\w]+/g, '-'),
                name
            });
            return "";
        });
        let markdown = "";
        // Convert the list we received to markdown.
        list.forEach(({ level, name, id }) => {
            let offset = "\t".repeat(level - 1);
            markdown += offset + `- [${name}](#${id})\n`;
        });
        return markdown;
    }
}
export { MarkdownExtension };
//# sourceMappingURL=markdown.js.map