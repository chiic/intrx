const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: __dirname + '/uploads/' })

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// get method
app.get('/get/:status', (req, res) => {
    const query = req.query;
    const params = req.params;
    if (params.status === 'error') {
        res.status(500)
        res.json({
            error: 'throw error'
        });
    }
    res.json({
        list: [1,2,3],
        query
    })
});

// post method
app.post('/post/1', (req, res) => {
    const body = req.body;
    const params = req.params;
    if (params.status === 'error') {
        res.status(500)
        res.json({
            error: 'throw error'
        });
    }
    res.json({
        list: body,
        params
    });
});
// timeout
app.post('/post/timeout', (req, res) => {
    const body = req.body;
    const params = req.params;
    setTimeout(() => {
        res.json({
            list: body,
            params
        });
    }, 4000);
});

app.post('/upload', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    res.json({
        upload: true
    })
})

app.listen(3001, (err) => {
    if(!err) {
        console.log('start server!');
    }
})