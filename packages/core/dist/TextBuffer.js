class TextBuffer {
    constructor(...initials) {
        this._buffer = [];
        this._buffer.push(...initials);
        initials.forEach(x => this.onAdd(x, this._buffer));
    }
    push(value) {
        this._buffer.push(value);
        this.onAdd(value, this._buffer);
    }
    flush() {
        let result = this.onFlush(this._buffer);
        this.empty();
        return result;
    }
    empty() {
        this._buffer = [];
    }
    get() {
        return this._buffer;
    }
    onFlush(buffer) {
        return buffer.join(", ");
    }
    onAdd(value, buffer) { }
}
export { TextBuffer };
//# sourceMappingURL=TextBuffer.js.map