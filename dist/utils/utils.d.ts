import { HttpEventType } from "../internals/base-event";
export declare class Utils {
    isEmpty(isMap: Map<any, any>): boolean;
    isEmpty(isObj: {
        [index: string]: any;
    }): boolean;
    isEmpty(isNull: null | undefined): boolean;
    isFormData(data: any): data is FormData;
    isBlob(value: any): value is Blob;
    isArrayBuffer(value: any): value is ArrayBuffer;
    detectContentType(body: any): "text/plain" | "application/json";
    serializeParams(obj: {
        [index: string]: any;
    }): string;
    serializeParams(map: Map<string, string>): string;
    serializeBody(body: any): any;
    handlerResponseHandler(ev: any, xhr: any): {
        type: HttpEventType;
        data: any;
        headers: any;
        status: any;
        statusText: any;
    };
    private serializeResponseHeader;
    handlerOption(ctx: any, option: any): any;
    observableHandler(observable: any, interceptors: any): any;
    forEach(obj: any, cb: any): void;
    handlerContentType(xhr: any, headers: any, body: any): void;
}
