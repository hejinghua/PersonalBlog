var everyDay = new Vue ({
    el: '#every_day',
    data: {
       content: '',

    },
    computed: {
        getContent: function () {
          return this.content;
        }
    },
    created: function () {
        let _self = this;
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function (res) {
            let result = res.data.data[0];
            _self.content = result.content;

        }).catch(function (res) {
            console.log('请求失败');
        });
    }
});

var articleList = new Vue ({
    el: '#article_list',
    data: {
        page: 1,//当前页
        pageSize: 5,
        count: 0,
        articleList: [],
        pageNumList: [],
        pages: 0, //总页数
    },
    computed:{
        getPage:function () {
             let _self = this;
             return function (page, pageSize) {
                 let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
                 if (searchUrlParams.split('=')[0] == 'tag' && searchUrlParams.split('=')[1] != null) {
                     let tag = searchUrlParams.split('=')[1];
                     axios({
                         method: 'get',
                         url: '/queryByTag?page='+ ( page - 1) + '&pageSize=' + pageSize + '&tag=' + tag,
                     }).then(function (res) {
                         _self.articleList = res.data.data;
                         _self.page = page;
                         for(let i in _self.articleList) {
                             _self.articleList[i].link = '/blog_detail.html?bid=' + _self.articleList[i].id;
                             _self.articleList[i].date = timeStampTurnTime(_self.articleList[i].ctime);
                         }
                     }).catch(function (res) {
                         console.log('请求失败');
                     });
                     if (_self.count == 0) {
                         axios({
                             method: "get",
                             url: "/queryByTagCount?tag=" + tag
                         }).then(function (res) {
                             // console.log(res.data.data[0].count);
                             _self.count = res.data.data[0].count;
                             _self.pages = parseInt((_self.count + _self.pageSize - 1) / _self.pageSize);

                         }).catch(function (res) {
                             console.log('请求失败');
                         });
                     }
                 }else if (searchUrlParams == '') {
                     axios({
                         method: 'get',
                         url: '/queryBlogByPage?page='+ ( page - 1) + '&pageSize=' + pageSize,
                     }).then(function (res) {
                         _self.articleList = res.data.data;
                         _self.page = page;
                         for(let i in _self.articleList) {
                             _self.articleList[i].link = '/blog_detail.html?bid=' + _self.articleList[i].id;
                             _self.articleList[i].date = timeStampTurnTime(_self.articleList[i].ctime);
                         }
                     }).catch(function (res) {
                         console.log('请求失败');
                     });
                     if (_self.count == 0) {
                         axios({
                             method: 'get',
                             url: '/queryBlogByCount',
                         }).then(function (res) {
                             // console.log(res.data.data[0].count);
                             _self.count = res.data.data[0].count;
                             _self.pages = parseInt((_self.count + _self.pageSize - 1) / _self.pageSize);

                         }).catch(function (res) {
                             console.log('请求失败');
                         });
                     }
                 } else {
                     return;
                 }

             }
        },
        show: function () {
            return this.pages && this.pages != 1
        },
        pstart: function () {
            return this.page != 0;
        },
        pend: function () {
            return this.page != this.pages;
        },
        efont: function () {
            if (this.pages <= 7) return false;
            return this.page > 5
        },
        ebehind: function () {
            if (this.pages <= 7) return false;
            let nowAy = this.indexs;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexs: function () {
            let left = 1,
                right = this.pages,
                ar = [];
            if (this.pages >= 7) {
                if (this.page > 5 && (this.page < this.pages - 4)){
                    left = Number(this.page) - 3;
                    right = Number(this.page) + 3;
                } else {
                    if (this.page <= 5) {
                        left = 1;
                        right = 7;
                    } else {
                        right = this.pages;

                        left = this.pages - 6;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
        jumpPage: function () {
            let _self = this;
            return function (id) {
                if (id <= _self.pages && id >= 1) {
                    _self.page = id;
                    _self.loadData(_self.page, _self.pageSize);
                }
            }
        },
        lessPage: function () {
            let _self = this;
            return function () {
                _self.page--;
                _self.loadData(_self.page, _self.pageSize);
            }
        },
        addPage: function () {
            return function () {
                let _self = this;
                if(_self.page < _self.pages) {
                    _self.page++;
                    _self.loadData(_self.page, _self.pageSize);
                }else {
                    _self.loadData(_self.page, _self.pageSize);
                }
            }
        },
        loadData: function () {
            let _self = this;
            return function (page, pageSize) {
                _self.getPage(page, pageSize);
            }
        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
});