import {catchError, map} from "rxjs/operators";
import { HttpEventType } from "../internals/base-event";

export class Utils {
    /**
     *  是否为空的map
     * @param isMap
     * @return boolean
    */
    isEmpty(isMap: Map<any, any>): boolean;
    /**
     *  是否为空object
     * @param isObj
     * @return boolean
    */
    isEmpty(isObj: {[index: string]: any}): boolean;
    /**
     *  是否为undefined or null
     * @param isNull
     * @return boolean
     */
    isEmpty(isNull: null | undefined): boolean;

    isEmpty(is: Map<any, any> | {[index: string]: any} | null | undefined): boolean{
        if(is instanceof Map) {
            const entry = is.keys();
            const { done } = entry.next();
            return done;
        } else if(is instanceof Object) {
            return Object.values(is).length === 0
        }
        return is === null || is === undefined
    }

    isFormData(data): data is FormData {
        return typeof FormData && data instanceof FormData;
    }

    isBlob(value: any): value is Blob {
        return typeof Blob !== 'undefined' && value instanceof Blob;
    }

    isArrayBuffer(value: any): value is ArrayBuffer {
        return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
    }
    /**
     * 判断请求体数据类型
     * @param body 
     * @return boolean
    */
    detectContentType(body) {

        if (body === null) {
            return null;
        }

        if (this.isFormData(body)) {
            return null;
        }

        if (this.isBlob(body)) {
            return null;
        }

        if (this.isArrayBuffer(body)) {
            return null;
        }

        if (typeof body === 'string') {
            return 'text/plain';
        }

        if (typeof body === 'object' || typeof body === 'number' || Array.isArray(body)) {
            return 'application/json';
        }

        return null;
    }

    // 序列化请求参数
    serializeParams(obj: {[index: string]: any}): string;

    serializeParams(map: Map<string, string>): string;

    serializeParams(first: Map<string, string> | {[index: string]: any}) {
        const list = [];
        if(first instanceof Map) {
            for (let [key, value] of first.entries()) {
                list.push(`${key}=${value}`);
            }
        } else {
            Object.keys(first).forEach((value, index, arr) => {
                list.push(`${index}=${first[index]}`);
            })
        }
        return list.join('&')
    }

    // 序列化请求体
    serializeBody(body) {
        if (body === null || body === undefined) {
            return null;
        }
        // 直接返回arrayBuffer Blob FormData string对象
        if (this.isArrayBuffer(body) || this.isBlob(body) || this.isFormData(body) || typeof body === 'string') {
            return body;
        }
        // 检查 body 是否为 object array
        if (typeof body === 'object' || typeof body === 'boolean' || Array.isArray(body)) {
            return JSON.stringify(body);
        }
        return (body as any).toString();
    }

    // 处理返回值
    handlerResponseHandler(ev, xhr) {
        let _body = (!xhr.responseType || xhr.responseType === 'text') ? xhr.responseText : xhr.response;
        if(xhr.responseType === 'json' && typeof _body === 'string') {
            _body = JSON.parse(_body);
        }
        const allHeader = xhr.getAllResponseHeaders();

        return {
            type: HttpEventType.Response,
            data: _body,
            headers: this.serializeResponseHeader(allHeader),
            status: xhr.status,
            statusText: xhr.statusText || 'OK'
        }
    }

    private serializeResponseHeader(headerStr) {
        const midHeader = headerStr.split('\r\n');
        const list = {} as any;
        midHeader.forEach(v => {
            const reg = /(.+):(.+)/;
            if(reg.test(v)) {
                const match = v.match(reg);
                list[match[1]] = match[2].trim();
            }
        });
        return list;
    }
    /**
     * @param ctx 上下文
     * @params option 当前请求option
     * @return hooks后得option
     * */
    handlerOption(ctx, option) {
        option.headers = option.headers || {};
        option.body = option.body || {};
        option.params = option.params || {};
        // let _option = {} as any;
        const globalConf = ctx.interceptors.getConfig();
        if(globalConf?.length) {
            globalConf.forEach(fn => {
                fn(option)
            })
        }
        return option;
    }
    /**
     * @param observable observable对象
     * @params interceptors 拦截器对象
     * @return observable<any>
     * */
    observableHandler(observable, interceptors) {
        const nextList = interceptors.getResList();
        const errList = interceptors.getErrorList();
        let _errList = [];
        let _nextList = [];
        if(errList?.length) {
            _errList = errList.map(v => catchError(v))
        }

        if(nextList?.length) {
            _nextList = nextList.map(v => map(v))
        }
        return observable.pipe(
            ..._nextList,
            ..._errList
        )
    }

    /**
     * @param obj 遍历对象
     * @param cb 回调函数
     * */
    forEach(obj, cb) {
        const keys = Object.keys(obj);
        keys.forEach((key, index) => {
            cb.call(null,obj[key], key);
        })
    }

    /**
     * @param 
     * 
    */

    handlerContentType(xhr, headers, body) {
        if (!this.isEmpty(headers)) {
            if (!headers || !headers['Accept']) {
                xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            }

            Object.keys(headers || {}).forEach((value, key, arr) => {
                xhr.setRequestHeader(value, headers[value]);
            });
        }
        const contentType = headers && headers['Content-Type'];
        if (!contentType) {
            const content = this.detectContentType(body);
            if (content) {
                xhr.setRequestHeader('Content-Type', content);
            }
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
    }
}