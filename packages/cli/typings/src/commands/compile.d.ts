declare global {
    interface Console {
        fatal: (message: string, code?: number) => {};
    }
}
export declare function compile(args: {
    default: string[];
    config?: string;
    out?: string;
    force?: boolean;
}): Promise<void>;
