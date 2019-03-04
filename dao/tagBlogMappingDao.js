var dbutil = require('./dbutils');

function insertTagBlogMapping(tag_id, blog_id, ctime, utime, success) {
    var insertSql = 'insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values(?,?,?,?)';
    var params = [tag_id, blog_id, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryByTag(tag_id, page, pageSize, success) {
    var querySql = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?;';
    var params = [tag_id, page * pageSize, pageSize,];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            throw new Error(error);
        }
    });
    connection.end();
}


module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;