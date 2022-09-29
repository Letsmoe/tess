interface Token {
    type?: TokenTypes;
    value?: string | undefined;
    pos: number;
}
declare enum TokenTypes {
    Whitespace = 0,
    OpenBrace = 1,
    CloseBrace = 2,
    Char = 3
}
declare class Lexer {
    private pos;
    private content;
    private tokenTypes;
    private lastToken;
    constructor();
    reset(input: string): void;
    next(): Token;
    addTokenType(name: string, regexp: RegExp): void;
    private eof;
}
export { Lexer };
