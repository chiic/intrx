import { Observable } from "rxjs";

import { Utils } from "../utils/utils";

import type { query } from "./types";

import { Interceptor } from './interceptor'
import { OnProgressEvent } from "./progress";
import { HttpEventType } from "./base-event";

export class Intrx extends Utils {

    interceptors = new Interceptor()

    /**
     * 基础请求API
     * @param optiton 请求参数
     * 
    */
    request<T>(options: {
        url: string,
        method?: string;
        headers?: { [index: string]: string };
        params?: { [index: string]: string };
        body?: query;
        timeout?: number;
        progress?: boolean;
        responseType: 'json';
        withCredentials?: boolean;
    }): Observable<T>;
    request<T>(options: {
        url: string,
        method?: string;
        headers?: { [index: string]: string };
        params?: { [index: string]: string };
        body?: query;
        timeout?: number;
        progress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
    }): Observable<T>;
    request<T>(options: {
        url: string,
        method: string;
        headers?: { [index: string]: string };
        params?: { [index: string]: string };
        body?: query;
        timeout?: number;
        progress?: boolean;
        responseType?: 'blob';
        withCredentials?: boolean;
    }): Observable<T>;
    request<T>(options: {
        url: string,
        method: string;
        headers?: { [index: string]: string };
        params?: { [index: string]: string };
        body?: query;
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }): Observable<T>;

    request<T>(options: {
        url: string,
        method?: string;
        headers?: { [index: string]: string };
        params?: { [index: string]: string };
        body?: query;
        timeout?: number;
        progress?: boolean;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
    }) {

        const { params, headers, body, method, url } = this.handlerOption(this, options);

        const xhr = new XMLHttpRequest();

        // 设置绑定请求参数的url

        if (!this.isEmpty(params)) {
            options.url = options.url + '?' + this.serializeParams(params);
        }

        const reqBody = this.serializeBody(body);

        xhr.open(method, url);

        // 设置contentType
        this.handlerContentType(xhr, headers, body);

        // 设置responseType
        xhr.responseType = (
            (typeof options.responseType === 'string' && options.responseType)
                ? options.responseType.toLowerCase()
                : 'json'
        ) as any;

        // 设置withCredentials.
        xhr.withCredentials = !!options.withCredentials;
        // set timeout.
        const observale = new Observable((obser) => {

            const onload = (e) => {
                const data = this.handlerResponseHandler(e, xhr);
                let ok = data.status >= 200 && data.status < 300;
                if (ok) {
                    obser.next(data);
                } else {
                    obser.error(data);
                }
            }
            const onProgress = (e, type) => {
                obser.next(new OnProgressEvent(e, type));
            }

            const onUploadProgress = (e) => onProgress(e, HttpEventType.UploadProgress);
            const onDownProgress = (e) => onProgress(e, HttpEventType.DownProgress);
            const onTimeOut = (e) => {
                onProgress(e, HttpEventType.Timeout);
                obser.complete();
            };

            if (options.timeout) {
                xhr.timeout = options.timeout;
                xhr.addEventListener('timeout', onTimeOut)
            }
            if (options.progress) {
                xhr.upload.addEventListener('progress', onUploadProgress);
                xhr.addEventListener('progress', onDownProgress);
            }

            xhr.addEventListener('load', onload);

            xhr.send(reqBody);
            return () => {
                if (xhr.readyState !== xhr.DONE) {
                    xhr.abort();
                }
                xhr.removeEventListener('load', onload);
                xhr.upload.removeEventListener('progress', onUploadProgress);
                xhr.removeEventListener('progress', onDownProgress);
                xhr.removeEventListener('timeout', onTimeOut)
            };
        })
        return this.observableHandler(observale, this.interceptors);
    }
    /**
     * GET 请求
     * @params url
     * @params options
     * @return Observable<T>
    */
    get(url: string, options?: {
        params?: { [index: string]: string };
        headers?: { [index: string]: string };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }) {
        const _opts = {
            url,
            method: 'GET',
            ...options
        }
        return this.request(_opts)
    }
    /**
     * POST 请求
     * @params url
     * @params options
     * @return Observable<T>
    */
    post(url: string, options?: {
        body: { [index: string]: any } | null
        params?: { [index: string]: string };
        headers?: { [index: string]: string };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }) {
        const _opts = { url, method: 'POST', ...options };
        return this.request(_opts);
    }
    /**
     * PUT请求
     * @params url
     * @params options
     * @return Observable<T>
    */
    put(url: string, options: {
        body: { [index: string]: any } | null
        params?: { [index: string]: string };
        headers?: { [index: string]: string };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }) {
        const _opts = { method: 'PUT', url, ...options };
        return this.request(_opts);
    }
    /**
     * DELETE请求
     * @params url
     * @params options
     * @return Observable<T>
    */
    delete(url: string, options?: {
        params?: { [index: string]: string };
        headers?: { [index: string]: string };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }) {
        const _opts = { method: 'DELETE', url, ...options };
        return this.request(_opts);
    }
    /**
     * OPTIONS请求
     * @params url
     * @params options
     * @return Observable<T>
    */
    options(url: string, options?: {
        params?: { [index: string]: string };
        headers?: { [index: string]: string };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        progress?: boolean;
        withCredentials?: boolean;
    }) {
        const _opts = { url, method: 'OPTIONS', ...options };
        return this.request(_opts);
    }
    /**
     * PATCH请求
     * @params url
     * @params options
     * @return Observable<T>
    */
    patch(url: string, options?: {
        params?: { [index: string]: string };
        headers?: { [index: string]: string };
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        timeout?: number;
        progress?: boolean;
        withCredentials?: boolean;
    }) {
        const _opts = { url, method: 'PATCH', ...options };
        return this.request(_opts);
    }

}
