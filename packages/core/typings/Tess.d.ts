interface TessProcedure {
    call: (args: {
        [key: string]: any;
    }) => string;
}
declare class Tess {
    static parse(input: string): TessProcedure;
    static compile(input: string): string;
}
export default Tess;
//# sourceMappingURL=Tess.d.ts.map