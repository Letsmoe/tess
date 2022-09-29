var TokenTypes;
(function (TokenTypes) {
    TokenTypes[TokenTypes["Whitespace"] = 0] = "Whitespace";
    TokenTypes[TokenTypes["OpenBrace"] = 1] = "OpenBrace";
    TokenTypes[TokenTypes["CloseBrace"] = 2] = "CloseBrace";
    TokenTypes[TokenTypes["Char"] = 3] = "Char";
})(TokenTypes || (TokenTypes = {}));
var Lexer = /** @class */ (function () {
    function Lexer() {
        this.pos = 0;
        this.content = "";
        this.tokenTypes = [];
        this.lastToken = null;
    }
    Lexer.prototype.reset = function (input) {
        this.pos = 0;
        this.content = input;
    };
    Lexer.prototype.next = function () {
        var token = {
            pos: this.pos + 1
        };
        if (!this.eof()) {
            var char = this.content[this.pos++];
            token.value = char;
            if (/[\s\t\n\r]/.test(char)) {
                token.type = TokenTypes.Whitespace;
            }
            else if (char === "{") {
                token.type = TokenTypes.OpenBrace;
            }
            else if (char === "}") {
                token.type = TokenTypes.CloseBrace;
            }
            else {
                if (this.lastToken && this.lastToken.type === TokenTypes.Char) {
                    this.lastToken.value += char;
                    return this.lastToken;
                }
                else {
                    token.type = TokenTypes.Char;
                }
            }
            return token;
        }
        return null;
    };
    Lexer.prototype.addTokenType = function (name, regexp) {
        this.tokenTypes.push({ name: name, regexp: regexp });
    };
    Lexer.prototype.eof = function () {
        if (this.content.length <= this.pos) {
            return true;
        }
    };
    return Lexer;
}());
export { Lexer };
//# sourceMappingURL=Lexer.js.map