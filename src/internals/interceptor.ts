import {Observable, of} from "rxjs";

type ars = {
    [index: string]: string | number;
}

type resType = {
    next: (arg: any) => any;
    err: (err: any) => any;
}

interface interceptorHandler {
    reqInterce(callback: (config: ars) => ars);
    resInterce(obj: resType);
}

export class Interceptor implements interceptorHandler {
    private configList = [];
    private resList = [];
    private errList = [];
    reqInterce(configCall) {
        this.configList.unshift(configCall);
    }

    resInterce(obj) {
        this.resList.push(obj.next);
        this.errList.push(obj.err);
    }

    getConfig() {
        return this.configList;
    }

    getResList() {
        return this.resList;
    }

    getErrorList() {
        this.errList;
    }


}