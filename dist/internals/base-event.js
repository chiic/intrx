export var HttpEventType;
(function (HttpEventType) {
    HttpEventType[HttpEventType["UploadProgress"] = 0] = "UploadProgress";
    HttpEventType[HttpEventType["DownProgress"] = 1] = "DownProgress";
    HttpEventType[HttpEventType["Timeout"] = 2] = "Timeout";
    HttpEventType[HttpEventType["Response"] = 3] = "Response";
})(HttpEventType || (HttpEventType = {}));
