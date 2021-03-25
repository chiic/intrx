var Interceptor = (function () {
    function Interceptor() {
        this.configList = [];
        this.resList = [];
        this.errList = [];
    }
    Interceptor.prototype.reqInterceptor = function (configCall) {
        this.configList.unshift(configCall);
    };
    Interceptor.prototype.resInterceptor = function (obj) {
        this.resList.push(obj.next);
        this.errList.push(obj.err);
    };
    Interceptor.prototype.getConfig = function () {
        return this.configList;
    };
    Interceptor.prototype.getResList = function () {
        return this.resList;
    };
    Interceptor.prototype.getErrorList = function () {
        this.errList;
    };
    return Interceptor;
}());
export { Interceptor };
