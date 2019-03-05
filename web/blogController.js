var blogDao = require('../dao/blogDao');
var tagsDao = require('../dao/tagDao');
var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var url = require('url');

var path = new Map();

function queryBlogByHot(requset, response) {
    blogDao.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryBlogByHot', queryBlogByHot);

function queryAllBlog(requset, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryAllBlog', queryAllBlog);

function queryBlogById(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.id), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
    blogDao.addViews(parseInt(params.id), function (result) {})
}
path.set('/queryBlogById', queryBlogById);

function queryBlogCount(request, response) {
    blogDao.queryBlogByCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryBlogByCount', queryBlogCount);

function queryBlogByPage(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for(let i in result) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, '');
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 100);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });

}
path.set('/queryBlogByPage', queryBlogByPage);

function editBlog(request, response) {
    let params = url.parse(request.url, true).query;
    let tags = params.tags.replace(/ /g, '').replace('，',',');
    request.on('data', function (data) {
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '博客编辑成功', null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(',');
            for(let i = 0; i< tagList.length; i++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    })
}
path.set('/editBlog', editBlog);

function queryTag(tag, blogId) { //查询tag是否存在tags表中，若没有将tag插入到tags表中
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}
function insertTag(tag, blogId) {//tag不仅插入到tags表中，还要插入映射表中
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    });
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {

    });
}

module.exports.path = path;