export declare type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
export declare type query = {
    [index: string]: string;
} | FormData | string | ArrayBuffer | Blob;
export declare type responseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
export declare type optionsType = {
    url: string;
    method?: methodType;
    baseURL?: string;
    headers?: query;
    params?: query;
    data?: query;
    timeout?: number;
    withCredentials?: false;
    responseType?: responseType;
    responseEncoding?: string;
    maxContentLength?: string;
    progress?: boolean;
};
export declare type response = {
    data?: {
        [index: string]: any;
    };
    status: number;
    statusText: string;
    headers: {
        [index: string]: string;
    };
};
