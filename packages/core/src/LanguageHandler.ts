class LanguageHandler {
	public constructor(public languages: string[]) {

	}

	public execute(code: string[]): Promise<string> | never {
		throw new Error("Execute function for language handler has not been implemented properly.");
	}
}

export { LanguageHandler }