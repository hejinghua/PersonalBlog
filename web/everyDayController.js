var everyDayDao = require('../dao/everyDayDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');

var path = new Map();

function editEveryDay(request, response) {
    request.on('data', function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
        });
    })
}
path.set('/editEveryday', editEveryDay);

function queryEveryday(request, response) {
        everyDayDao.queryEveryDay(function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        });
}
path.set('/queryEveryday', queryEveryday);

module.exports.path = path;