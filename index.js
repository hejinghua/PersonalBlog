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
app.get('/addComment', loader.get('/addComment'));
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));

app.get('/queryAllBlog', loader.get('/queryAllBlog')); // 地图页面

app.get('/queryRandomTags', loader.get('/queryRandomTags'));// 随机标签云
app.get('/queryBlogByHot', loader.get('/queryBlogByHot'));// 最近热门
app.get('/queryNewComment', loader.get('/queryNewComment'));// 最新评论

app.get('/queryByTag', loader.get('/queryByTag'));// 点击随机云标签

app.listen(globalConfig.port, function () {
    console.log('服务已启动')
});