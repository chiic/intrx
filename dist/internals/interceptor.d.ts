declare type ars = {
    [index: string]: string | number;
};
declare type resType = {
    next: (arg: any) => any;
    err: (err: any) => any;
};
interface interceptorHandler {
    reqInterceptor(callback: (config: ars) => ars): any;
    resInterceptor(obj: resType): any;
}
export declare class Interceptor implements interceptorHandler {
    private configList;
    private resList;
    private errList;
    reqInterceptor(configCall: any): void;
    resInterceptor(obj: any): void;
    getConfig(): any[];
    getResList(): any[];
    getErrorList(): void;
}
export {};
