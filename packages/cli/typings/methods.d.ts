import fs from "fs";
import path from 'path';
export declare const DEFAULT_METHODS: {
    read: typeof fs.readFileSync;
    write: typeof fs.writeFileSync;
    readdir: typeof fs.readdirSync;
    exists: typeof fs.existsSync;
    join: (delimiter: string, ...args: string[]) => string;
    path: path.PlatformPath;
    int: typeof parseInt;
    float: typeof parseFloat;
    object: (text: string, reviver?: (this: any, key: string, value: any) => any) => any;
    json: {
        (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
        (value: any, replacer?: (string | number)[], space?: string | number): string;
    };
};
