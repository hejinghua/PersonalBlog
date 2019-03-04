var dbutil = require('./dbutils');

function insertComment(blog_id, parent, parent_name, user_name, email, comments, ctime, utime, success) {
    let insertSql = 'insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values(?,?,?,?,?,?,?,?)';
    let params = [blog_id, parent, parent_name, user_name, email, comments, ctime, utime];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryComment(blog_id,success) {
    let querySql = 'select * from comments where blog_id = ?';
    let params = [blog_id];

    let connection = dbutil.createConnection();
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
function queryNewComment(size, success) {
    let querySql = 'select * from comments order by id desc limit ?';
    let params = [size];

    let connection = dbutil.createConnection();
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

module.exports.insertComment = insertComment;
module.exports.queryComment = queryComment;
module.exports.queryNewComment = queryNewComment;