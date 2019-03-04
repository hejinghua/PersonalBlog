var commentDao = require('../dao/commentDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var captcha = require('svg-captcha');
var url = require('url');

var path = new Map();

function queryNewComment(request, response) {
    commentDao.queryNewComment(6, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', result));
        response.end();
    });
}
path.set('/queryNewComment', queryNewComment);

function addComment(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.id), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end();
    });
}
path.set('/addComment', addComment);

function queryRandomCode(request, response) {
    let img = captcha.create({fontSize: 50, width: 100, height: 32});
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '成功', img));
    response.end();
}
path.set('/queryRandomCode', queryRandomCode);

function queryCommentsByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryComment(parseInt(params.id), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '成功', result));
        response.end();
    })
}
path.set('/queryCommentsByBlogId', queryCommentsByBlogId);
module.exports.path = path;