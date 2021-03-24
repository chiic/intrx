declare type ars = {
    [index: string]: string | number;
};
declare type resType = {
    next: (arg: any) => any;
    err: (err: any) => any;
};
interface interceptorHandler {
    reqInterce(callback: (config: ars) => ars): any;
    resInterce(obj: resType): any;
}
export declare class Interceptor implements interceptorHandler {
    private configList;
    private resList;
    private errList;
    reqInterce(configCall: any): void;
    resInterce(obj: any): void;
    getConfig(): any[];
    getResList(): any[];
    getErrorList(): void;
}
export {};
