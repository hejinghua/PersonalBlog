var randomTags = new Vue ({
    el: '#random_tags',
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                let red = Math.random() * 255;
                let green = Math.random() * 255;
                let blue = Math.random() * 255;
                return 'rgb(' + red + ',' + green +',' + blue + ')'
            }
        },
        randomSize: function () {
            return function () {
               let size = (Math.random() * 20 + 12) + 'px';
               return size;
            }
        },
        getAllTags: function () {
            let _self = this;
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomTags',
                    // params: {}
                }).then(function (res) {
                    _self.tags = res.data.data;

                }).catch(function (res) {
                    console.log('请求失败');
                });
            }
        }
    },
    created: function () {
        this.getAllTags();
    }

});
var newHot = new Vue ({
     el: '#new_hot',
     data: {
         hotList: []
     },
     computed:{
         getNewHotList: function () {
             let _self = this;
             return function () {
                 axios({
                     method: 'get',
                     url: '/queryBlogByHot',
                     // params: {}
                 }).then(function (res) {
                     for (let i in res.data.data) {
                         let temp = {};
                         temp.title = res.data.data[i].title;
                         temp.link = '/blog_detail.html?bid=' +  res.data.data[i].id;
                         _self.hotList.push(temp);
                     }
                 }).catch(function (res) {
                     console.log('请求失败');
                 });
             }
         }
     },
    created: function () {
        this.getNewHotList();
    }

});
var newComments = new Vue ({
    el: '#new_comments',
    data: {
        commentList: []
    },
    created: function () {
        this.getNewCommentList();
    },
    computed: {
        getNewCommentList: function () {
            let _self = this;
            return function () {
                axios({
                    method: 'get',
                    url: '/queryNewComment',
                    // params: {}
                }).then(function (res) {
                    for (let i in res.data.data) {
                        let temp = {};
                        temp.name = res.data.data[i].user_name;
                        temp.date = timeStampTurnTime(res.data.data[i].ctime);
                        temp.comment = res.data.data[i].comments;
                        _self.commentList.push(temp);
                    }
                    // console.log(res);
                }).catch(function (res) {
                    console.log('请求失败');
                });
            }
        }
    }
});