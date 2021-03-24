import { Observable } from "rxjs";
import { Utils } from "../utils/utils";
import type { query } from "./types";
import { Interceptor } from './interceptor';
export declare class Intrx extends Utils {
    interceptors: Interceptor;
    request<T>(options: {
        url: string;
        method?: string;
        headers?: {
            [index: string]: string;
        };
        params?: {
            [index: string]: string;
        };
        body?: query;
        timeout?: number;
        progress?: boolean;
        responseType: 'json';
        withCredentials?: boolean;
    }): Observable<T>;
    request<T>(options: {
        url: string;
        method?: string;
        headers?: {
            [index: string]: string;
        };
        params?: {
            [index: string]: string;
        };
        body?: query;
        timeout?: number;
        progress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
    }): Observable<T>;
    request<T>(options: {
        url: string;
        method: string;
        headers?: {
            [index: string]: string;
        };
        params?: {
            [index: string]: string;
        };
        body?: query;
        timeout?: number;
        progress?: boolean;
        responseType?: 'blob';
        withCredentials?: boolean;
    }): Observable<T>;
    request<T>(options: {
        url: string;
        method: string;
        headers?: {
            [index: string]: string;
        };
        params?: {
            [index: string]: string;
        };
        body?: query;
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<T>;
    get(url: string, options?: {
        params?: {
            [index: string]: string;
        };
        headers?: {
            [index: string]: string;
        };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<unknown>;
    post(url: string, options?: {
        body: {
            [index: string]: any;
        } | null;
        params?: {
            [index: string]: string;
        };
        headers?: {
            [index: string]: string;
        };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<unknown>;
    put(url: string, options: {
        body: {
            [index: string]: any;
        } | null;
        params?: {
            [index: string]: string;
        };
        headers?: {
            [index: string]: string;
        };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<unknown>;
    delete(url: string, options?: {
        params?: {
            [index: string]: string;
        };
        headers?: {
            [index: string]: string;
        };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<unknown>;
    options(url: string, options?: {
        params?: {
            [index: string]: string;
        };
        headers?: {
            [index: string]: string;
        };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<unknown>;
    patch(url: string, options?: {
        params?: {
            [index: string]: string;
        };
        headers?: {
            [index: string]: string;
        };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<unknown>;
}
