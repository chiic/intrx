var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { catchError, map } from "rxjs/operators";
import { HttpEventType } from "../internals/base-event";
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.isEmpty = function (is) {
        if (is instanceof Map) {
            var entry = is.keys();
            var done = entry.next().done;
            return done;
        }
        else if (is instanceof Object) {
            return Object.values(is).length === 0;
        }
        return is === null || is === undefined;
    };
    Utils.prototype.isFormData = function (data) {
        return typeof FormData && data instanceof FormData;
    };
    Utils.prototype.isBlob = function (value) {
        return typeof Blob !== 'undefined' && value instanceof Blob;
    };
    Utils.prototype.isArrayBuffer = function (value) {
        return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
    };
    Utils.prototype.detectContentType = function (body) {
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
    };
    Utils.prototype.serializeParams = function (first) {
        var e_1, _a;
        var list = [];
        if (first instanceof Map) {
            try {
                for (var _b = __values(first.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    list.push(key + "=" + value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            Object.keys(first).forEach(function (value, index, arr) {
                list.push(index + "=" + first[index]);
            });
        }
        return list.join('&');
    };
    Utils.prototype.serializeBody = function (body) {
        if (body === null || body === undefined) {
            return null;
        }
        if (this.isArrayBuffer(body) || this.isBlob(body) || this.isFormData(body) || typeof body === 'string') {
            return body;
        }
        if (typeof body === 'object' || typeof body === 'boolean' || Array.isArray(body)) {
            return JSON.stringify(body);
        }
        return body.toString();
    };
    Utils.prototype.handlerResponseHandler = function (ev, xhr) {
        var _body = (!xhr.responseType || xhr.responseType === 'text') ? xhr.responseText : xhr.response;
        if (xhr.responseType === 'json' && typeof _body === 'string') {
            _body = JSON.parse(_body);
        }
        var allHeader = xhr.getAllResponseHeaders();
        return {
            type: HttpEventType.Response,
            data: _body,
            headers: this.serializeResponseHeader(allHeader),
            status: xhr.status,
            statusText: xhr.statusText || 'OK'
        };
    };
    Utils.prototype.serializeResponseHeader = function (headerStr) {
        var midHeader = headerStr.split('\r\n');
        var list = {};
        midHeader.forEach(function (v) {
            var reg = /(.+):(.+)/;
            if (reg.test(v)) {
                var match = v.match(reg);
                list[match[1]] = match[2].trim();
            }
        });
        return list;
    };
    Utils.prototype.handlerOption = function (ctx, option) {
        option.headers = option.headers || {};
        option.body = option.body || {};
        option.params = option.params || {};
        var globalConf = ctx.interceptors.getConfig();
        if (globalConf === null || globalConf === void 0 ? void 0 : globalConf.length) {
            globalConf.forEach(function (fn) {
                fn(option);
            });
        }
        return option;
    };
    Utils.prototype.observableHandler = function (observable, interceptors) {
        var nextList = interceptors.getResList();
        var errList = interceptors.getErrorList();
        var _errList = [];
        var _nextList = [];
        if (errList === null || errList === void 0 ? void 0 : errList.length) {
            _errList = errList.map(function (v) { return catchError(v); });
        }
        if (nextList === null || nextList === void 0 ? void 0 : nextList.length) {
            _nextList = nextList.map(function (v) { return map(v); });
        }
        return observable.pipe.apply(observable, __spreadArray(__spreadArray([], __read(_nextList)), __read(_errList)));
    };
    Utils.prototype.forEach = function (obj, cb) {
        var keys = Object.keys(obj);
        keys.forEach(function (key, index) {
            cb.call(null, obj[key], key);
        });
    };
    Utils.prototype.handlerContentType = function (xhr, headers, body) {
        if (!this.isEmpty(headers)) {
            if (!headers || !headers['Accept']) {
                xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            }
            Object.keys(headers || {}).forEach(function (value, key, arr) {
                xhr.setRequestHeader(value, headers[value]);
            });
        }
        var contentType = headers && headers['Content-Type'];
        if (!contentType) {
            var content = this.detectContentType(body);
            if (content) {
                xhr.setRequestHeader('Content-Type', content);
            }
        }
        else if (contentType.includes('application/x-www-form-urlencoded')) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
    };
    return Utils;
}());
export { Utils };
