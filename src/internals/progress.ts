import { HttpEventType } from './base-event';


export interface HttpProgressEvent {

    type: HttpEventType.UploadProgress;
  
    loaded: number;

    total?: number;
  }


export class OnProgressEvent {
    type = -1;
  
    loaded = 0;;

    total = 0;

    constructor(ev: ProgressEvent, type) {
        const {
            loaded,
            total
        } = ev;
        this.type = type;
        this.loaded = loaded;
        this.total = total;
    }
}