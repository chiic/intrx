var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Observable } from "rxjs";
import { Utils } from "../utils/utils";
import { Interceptor } from './interceptor';
import { OnProgressEvent } from "./progress";
import { HttpEventType } from "./base-event";
var Intrx = (function (_super) {
    __extends(Intrx, _super);
    function Intrx() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.interceptors = new Interceptor();
        return _this;
    }
    Intrx.prototype.request = function (options) {
        var _this = this;
        var _a = this.handlerOption(this, options), params = _a.params, headers = _a.headers, body = _a.body, method = _a.method, url = _a.url;
        var xhr = new XMLHttpRequest();
        if (!this.isEmpty(params)) {
            options.url = options.url + '?' + this.serializeParams(params);
        }
        var reqBody = this.serializeBody(body);
        xhr.open(method, url);
        this.handlerContentType(xhr, headers, body);
        xhr.responseType = ((typeof options.responseType === 'string' && options.responseType)
            ? options.responseType.toLowerCase()
            : 'json');
        xhr.withCredentials = !!options.withCredentials;
        var observale = new Observable(function (obser) {
            var onload = function (e) {
                var data = _this.handlerResponseHandler(e, xhr);
                var ok = data.status >= 200 && data.status < 300;
                if (ok) {
                    obser.next(data);
                }
                else {
                    obser.error(data);
                }
            };
            var onProgress = function (e, type) {
                obser.next(new OnProgressEvent(e, type));
            };
            var onUploadProgress = function (e) { return onProgress(e, HttpEventType.UploadProgress); };
            var onDownProgress = function (e) { return onProgress(e, HttpEventType.DownProgress); };
            var onTimeOut = function (e) {
                onProgress(e, HttpEventType.Timeout);
                obser.complete();
            };
            if (options.timeout) {
                xhr.timeout = options.timeout;
                xhr.addEventListener('timeout', onTimeOut);
            }
            if (options.progress) {
                xhr.upload.addEventListener('progress', onUploadProgress);
                xhr.addEventListener('progress', onDownProgress);
            }
            xhr.addEventListener('load', onload);
            xhr.send(reqBody);
            return function () {
                if (xhr.readyState !== xhr.DONE) {
                    xhr.abort();
                }
                xhr.removeEventListener('load', onload);
                xhr.upload.removeEventListener('progress', onUploadProgress);
                xhr.removeEventListener('progress', onDownProgress);
                xhr.removeEventListener('timeout', onTimeOut);
            };
        });
        return this.observableHandler(observale, this.interceptors);
    };
    Intrx.prototype.get = function (url, options) {
        var _opts = __assign({ url: url, method: 'GET' }, options);
        return this.request(_opts);
    };
    Intrx.prototype.post = function (url, options) {
        var _opts = __assign({ url: url, method: 'POST' }, options);
        return this.request(_opts);
    };
    Intrx.prototype.put = function (url, options) {
        var _opts = __assign({ method: 'PUT', url: url }, options);
        return this.request(_opts);
    };
    Intrx.prototype.delete = function (url, options) {
        var _opts = __assign({ method: 'DELETE', url: url }, options);
        return this.request(_opts);
    };
    Intrx.prototype.options = function (url, options) {
        var _opts = __assign({ url: url, method: 'OPTIONS' }, options);
        return this.request(_opts);
    };
    Intrx.prototype.patch = function (url, options) {
        var _opts = __assign({ url: url, method: 'PATCH' }, options);
        return this.request(_opts);
    };
    return Intrx;
}(Utils));
export { Intrx };
