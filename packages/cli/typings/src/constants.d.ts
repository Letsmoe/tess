/// <reference types="node" />
/// <reference types="node" />
import os from "node:os";
export declare const DEFAULT_CONSTANTS: {
    __HOME__: string;
    __OS__: NodeJS.Platform;
    __TMP__: string;
    __OS_TYPE__: string;
    __ARCHITECTURE__: string;
    UV_UDP_REUSEADDR: number;
    signals: os.SignalConstants;
    errno: typeof os.constants.errno;
    priority: typeof os.constants.priority;
    TESS_EOL: string;
    TESS_CR: string;
    TESS_LF: string;
    TESS_VERSION: string;
    TESS_MAJOR_VERSION: number;
    TESS_MINOR_VERSION: number;
    TESS_PATCH_VERSION: number;
    TESS_VERSION_ID: number;
};
