var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');

var app = new express();

app.use(express.static('./page/'));

app.post('/editEveryday', loader.get('/editEveryday'));
app.get('/queryEveryday', loader.get('/queryEveryday'));

app.post('/editBlog', loader.get('/editBlog'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
app.get('/queryBlogByCount', loader.get('/queryBlogByCount'));

app.get('/queryBlogById', loader.get('/queryBlogById'));


app.listen(globalConfig.port, function () {
    console.log('服务已启动')
});