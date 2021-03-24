export type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export type query = {
    [index: string]: string;
} | FormData | string | ArrayBuffer | Blob;
export type responseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';


export type optionsType =  {
    // `url` 是用于请求的服务器 URL
   url: string;
 
   // `method` 是创建请求时使用的方法
   method?: methodType; // default
 
   // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
   // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
   baseURL?: string;
 
   // `headers` 是即将被发送的自定义请求头
   headers?: query;
 
   // `params` 是即将与请求一起发送的 URL 参数
   // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
   params?: query;
 
   // `data` 是作为请求主体被发送的数据
   data?: query;
 
   // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
   timeout?: number;
 
    // `withCredentials` 表示跨域请求时是否需要使用凭证
   withCredentials?: false; // default
 
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
   responseType?: responseType; // default
 
   // `responseEncoding` indicates encoding to use for decoding responses
   // Note: Ignored for `responseType` of 'stream' or client-side requests
   responseEncoding?: string; // default
 
    // `maxContentLength` 定义允许的响应内容的最大尺寸
   maxContentLength?: string;
   // 是否记录progress事件
   progress?: boolean;
 }

 export type response = {
    // `data` 响应数据
    data?: {[index:string]: any};

    // `status` HTTP 状态码
    status: number;

    // `statusText` HTTP 状态信息
    statusText: string;

    // `headers` 服务器响应的头
    headers: {[index: string]: string};
 }