const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const single_res = require('./api/routes/single_response');
const multiple_res = require('./api/routes/multiple_response');
const multiple_detail = require('./api/routes/multipleDetail_res');
const form_res = require('./api/routes/form_response');
const User = require('./api/routes/user');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin','X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res(200).json({})
    }
    next();
});

mongoose.connect('mongodb+srv://foryou:'+ process.env.MONGO_PW +'@foryou.regjt.mongodb.net/'+ process.env.MONGO_DB +'?retryWrites=true&w=majority');

app.use('/single_res', single_res);
app.use('/multiple_res', multiple_res);
app.use('/multiple_detail', multiple_detail);
app.use('/form_res', form_res);
app.use('/user', User);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;