import intrx from "../../src";
// import './upload';
// power by intrx & jsonplaceholder

// intrx.get('http://jsonplaceholder.typicode.com/posts').subscribe(
//     res => console.log(res)
// )

// intrx.post('https://jsonplaceholder.typicode.com/posts', {
//     body: {
//         title: 'foo',
//         body: 'bar',
//         userId: 1,
//     },
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8'
//     }
// }).subscribe(
//     res => console.log(res)
// )

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


const in$ = intrx.post('http://localhost:3001/post/timeout', {
    body: {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
    },
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    },
    timeout: 3000,
}).subscribe(
    res => console.log(res),
    error => console.log(error)
);