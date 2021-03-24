import { HttpEventType } from './base-event';
export interface HttpProgressEvent {
    type: HttpEventType.UploadProgress;
    loaded: number;
    total?: number;
}
export declare class OnProgressEvent {
    type: number;
    loaded: number;
    total: number;
    constructor(ev: ProgressEvent, type: any);
}
