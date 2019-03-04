var dbutil = require('./dbutils');

function insertBlog(title, content, tags, views, ctime, utime, success) {
    let insertSql = 'insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values(?,?,?,?,?,?)';
    let params = [title, content, tags, views, ctime, utime];

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

function queryBlogByPage(page, pageSize, success) {
    let querySql = 'select * from blog order by id desc limit ?, ?;';
    let params = [page * pageSize, pageSize];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogByCount(success) {
    let querySql = 'select count(1) as count from blog;';
    let params = [];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogById(id, success) {
    let querySql = 'select * from blog where id = ?;';
    let params = [id];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryAllBlog(success) {
    let querySql = 'select * from blog;';
    let params = [];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function addViews(id, success) {
    let querySql = 'update blog set views = views + 1 where id = ?;';
    let params = [id];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}
function queryHotBlog(size, success) {
    let querySql = 'select * from blog order by views desc limit ?';
    let params = [size];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogByCount = queryBlogByCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;