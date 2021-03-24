# intrx 
##### Rxjs based tinny HTTP client for the browser.

#### **Features**
Make XMLHttpRequests from the browser
Supports the rxjs
Intercept request and response
unsubscribe requests

### **Used**

import intrx from 'intrx'
### **examples**
```
// GET method ajax
const intrxSub$: Subscription = intrx.get('/test/url')
     .subscribe(
        res => console.log(res),
        err => console.log(err),
        () => { console.log('complete');}
     )
// cencel
intrxSub$.unsubscribe();
```
### **Interceptor( Like axios )**
```
intrx.interceptors.reqInterceptor(function (config) {
    config.headers['XREQ'] = 'V';
    return config;
})
intrx.interceptors.resInterceptor({
    next: (data) => {
        data.v = '3123';
        return data;
    }
})

```
