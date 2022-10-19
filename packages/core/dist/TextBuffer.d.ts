declare class TextBuffer {
    private _buffer;
    constructor(...initials: string[]);
    push(value: string): void;
    flush(): string;
    empty(): void;
    get(): string[];
    onFlush(buffer: string[]): string;
    onAdd(value: string, buffer: string[]): void;
}
export { TextBuffer };
