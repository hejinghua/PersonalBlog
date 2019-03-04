var url = require('url');
var tagsDao = require('../dao/tagDao');
var mappingDap = require('../dao/tagBlogMappingDao');
var blogDao = require('../dao/blogDao');
var respUtil = require('../util/respUtil');


var path = new Map();
function queryRandomTags(request, response) {
    tagsDao.queryAllTags(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        });
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '成功', result));
        response.end();
    })
}
path.set('/queryRandomTags', queryRandomTags);

function queryByTag(request, response) {
    let params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '成功', null));
            response.end();
        } else {
            mappingDap.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                let blogList = [];
                for(let i = 0; i<result.length; i++) {
                    blogDao.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList,result.length,response);

            })
        }
    });
}
path.set('/queryByTag', queryByTag);
function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 10);
    }else {
        for(let i in blogList) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*'>/, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 100) + '...';
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '成功', blogList));
        response.end();
    }
}

module.exports.path = path;