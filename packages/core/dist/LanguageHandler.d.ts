declare class LanguageHandler {
    languages: string[];
    constructor(languages: string[]);
    execute(code: string[]): Promise<string> | never;
}
export { LanguageHandler };
