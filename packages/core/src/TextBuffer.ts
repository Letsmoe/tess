class TextBuffer {
	private _buffer: string[] = [];
	constructor(...initials: string[]) {
		this._buffer.push(...initials);
		initials.forEach(x => this.onAdd(x, this._buffer));
	}

	public push(value: string) {
		this._buffer.push(value);
		this.onAdd(value, this._buffer);
	}

	public flush(): string {
		let result = this.onFlush(this._buffer);
		this.empty();
		return result;
	}

	public empty() {
		this._buffer = [];
	}

	public get(): string[] {
		return this._buffer;
	}

	public onFlush(buffer: string[]): string {
		return buffer.join(", ");
	}

	public onAdd(value: string, buffer: string[]): void {}
}

export { TextBuffer }