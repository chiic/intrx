var OnProgressEvent = (function () {
    function OnProgressEvent(ev, type) {
        this.type = -1;
        this.loaded = 0;
        this.total = 0;
        var loaded = ev.loaded, total = ev.total;
        this.type = type;
        this.loaded = loaded;
        this.total = total;
    }
    ;
    return OnProgressEvent;
}());
export { OnProgressEvent };
