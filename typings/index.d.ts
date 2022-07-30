declare const example = "{{\n\tx = {{#/usr/bin/python print(5) }};\n}}\n\nHello World!";
declare class InputStream {
    private input;
    pos: number;
    line: number;
    col: number;
    constructor(input: string);
    next(): string;
    peek(offset?: number): string;
    eof(): boolean;
    reset(): void;
    croak(msg: string): void;
}
declare class TokenStream {
    private stream;
    private current;
    constructor(stream: InputStream);
    private readWhile;
    private readNext;
    peek(): any;
    next(): any;
    eof(): boolean;
    croak(msg: string): void;
    all(): any[];
}
declare function parse(input: TokenStream): {
    type: string;
    body: any[];
};
declare const input: InputStream;
declare const tokens: TokenStream;
declare const ast: {
    type: string;
    body: any[];
};
