var sendComment = new Vue({
    el: '#send_comment',
    data: {
        bid: -10,
        reply: -1,
        reply_name: '',
        name: '',
        email: '',
        code: '',
        content: '',
        vcode: '',
        rightCode: '',
    },
    computed:{
        sendComment:function () {
            return function () {
                let _self = this;
                if (_self.name == null) _self.name = '匿名用户';
                if (_self.content == null) {
                    alert('评论不能为空！！！');
                    return;
                }
                if (_self.code !==_self.rightCode) {
                    alert('验证码有误！');
                    return;
                }
                let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
                if (searchUrlParams == '') {
                    let url = location.href.split('/')[3];
                    if (url == 'about.html') {
                        _self.bid = -1;
                    }else if (url == 'guestbook.html') {
                        _self.bid = -2;
                    } else {
                        return;
                    }
                }else if (searchUrlParams.split('=')[0] == 'bid') {
                    try {
                        _self.bid = parseInt(searchUrlParams.split('=')[1]);
                    }catch (e) {
                        console.log(e)
                    }
                } else {
                    return;
                }
                axios({
                    method: 'get',
                    url: '/addComment',
                    params: {
                        id: _self.bid,
                        parent: _self.reply,
                        userName: _self.name,
                        email: _self.email,
                        content: _self.content,
                        parentName: _self.reply_name
                    }
                }).then(function (res) {
                    alert('评论提交成功！');
                    blogComments.getCommentList();

                }).catch(function (res) {
                    console.log('请求失败');
                });

            }
        },
        changeCode: function () {
            return function () {
                let _self = this;
                axios({
                    method: 'get',
                    url: '/queryRandomCode',
                }).then(function (res) {
                    _self.vcode = res.data.data.data;
                    _self.rightCode = res.data.data.text;

                }).catch(function (res) {
                    console.log('请求失败');
                });
            }
        }
    },
    created: function () {
        this.changeCode();

    }
});

var blogComments = new Vue ({
    el: '#blog_comments',
    data: {
        total: 0,
        commentList: [],
        bid: -10,

    },
    computed: {
        reply: function () {
            let _self = this;
            return function (commentId, userName) {
                sendComment.reply = commentId;
                sendComment.reply_name = userName;
                location.href = '#send_comment';
            }
        },
        getCommentList:function() {
            return function () {
                let _self = this;
                let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
                if (searchUrlParams == '') {
                    let url = location.href.split('/')[3];
                    if (url == 'about.html') {
                        _self.bid = -1;
                    } else if (url == 'guestbook.html') {
                        _self.bid = -2;
                    } else {
                        return;
                    }
                } else if (searchUrlParams.split('=')[0] == 'bid') {
                    try {
                        _self.bid = parseInt(searchUrlParams.split('=')[1]);
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    return;
                }
                axios({
                    method: 'get',
                    url: '/queryCommentsByBlogId?id=' + _self.bid,
                }).then(function (res) {
                    _self.commentList = res.data.data;
                    _self.total = _self.commentList.length;
                    for (let i in _self.commentList) {
                        if (_self.commentList[i].parent > -1) {
                            _self.commentList[i].options = '回复@' + _self.commentList[i].parent_name;
                        }
                        _self.commentList[i].date = timeStampTurnTime(_self.commentList[i].ctime);
                    }
                }).catch(function (res) {
                    console.log('请求失败');
                });
            }
        },
    },
    created: function () {
        this.getCommentList();
    }
});