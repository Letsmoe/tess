declare class TextBuffer {
    private _buffer;
    constructor(...initials: string[]);
    /**
     * Will append the value to the buffer and call the `onAdd` callback passing the value and the current state of the buffer.
     * @date 12/4/2022 - 6:06:15 PM
     *
     * @public
     * @param {string} value
     */
    push(value: string): void;
    /**
     * Will empty the buffer (all items stored since the moment it's been attached) and return the result of the `onFlush` method.
     * By default this will return the buffer as a string separated by comma.
     * @date 12/4/2022 - 6:04:31 PM
     *
     * @public
     * @returns {string}
     */
    flush(): string;
    /**
     * Will empty the buffer (all items stored since the moment it's been attached) and return the current buffer as an array.
     * @date 12/4/2022 - 6:04:31 PM
     *
     * @public
     * @returns {string[]}
     */
    flushArray(): string[];
    /**
     * Will empty the buffer.
     * @date 12/4/2022 - 6:06:52 PM
     *
     * @public
     */
    empty(): void;
    /**
     * Will return the current buffer instance by reference. (Modifications on the buffer will also be applied on the original object!)
     * @date 12/4/2022 - 6:07:00 PM
     *
     * @public
     * @returns {string[]}
     */
    get(): string[];
    /**
     * A customizable callback being called once the buffer is being flushed.
     * The return value of this function will be returned with the `flush` method.
     * @date 12/4/2022 - 6:08:05 PM
     *
     * @public
     * @param {string[]} buffer
     * @returns {string}
     */
    onFlush(buffer: string[], asArray?: boolean): string | string[];
    /**
     * A customizable callback called once a new item is added to the buffer.
     * @date 12/4/2022 - 6:08:59 PM
     *
     * @public
     * @param {string} value
     * @param {string[]} buffer
     */
    onAdd(value: string, buffer: string[]): void;
}
export { TextBuffer };
