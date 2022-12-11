class TextBuffer {
	private _buffer: string[] = [];
	constructor(...initials: string[]) {
		this._buffer.push(...initials);
		initials.forEach(x => this.onAdd(x, this._buffer));
	}

	
	/**
	 * Will append the value to the buffer and call the `onAdd` callback passing the value and the current state of the buffer.
	 * @date 12/4/2022 - 6:06:15 PM
	 *
	 * @public
	 * @param {string} value
	 */
	public push(value: string) {
		this._buffer.push(value);
		this.onAdd(value, this._buffer);
	}

	
	/**
	 * Will empty the buffer (all items stored since the moment it's been attached) and return the result of the `onFlush` method.
	 * By default this will return the buffer as a string separated by comma.
	 * @date 12/4/2022 - 6:04:31 PM
	 *
	 * @public
	 * @returns {string}
	 */
	public flush(): string {
		let result = this.onFlush(this._buffer);
		this.empty();
		return result;
	}

	
	/**
	 * Will empty the buffer.
	 * @date 12/4/2022 - 6:06:52 PM
	 *
	 * @public
	 */
	public empty() {
		this._buffer = [];
	}

	
	/**
	 * Will return the current buffer instance by reference. (Modifications on the buffer will also be applied on the original object!)
	 * @date 12/4/2022 - 6:07:00 PM
	 *
	 * @public
	 * @returns {string[]}
	 */
	public get(): string[] {
		return this._buffer;
	}

	
	/**
	 * A customizable callback being called once the buffer is being flushed.
	 * The return value of this function will be returned with the `flush` method.
	 * @date 12/4/2022 - 6:08:05 PM
	 *
	 * @public
	 * @param {string[]} buffer
	 * @returns {string}
	 */
	public onFlush(buffer: string[]): string {
		return buffer.join(", ");
	}

	
	/**
	 * A customizable callback called once a new item is added to the buffer.
	 * @date 12/4/2022 - 6:08:59 PM
	 *
	 * @public
	 * @param {string} value
	 * @param {string[]} buffer
	 */
	public onAdd(value: string, buffer: string[]): void {}
}

export { TextBuffer }