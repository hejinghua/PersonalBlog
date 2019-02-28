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
        page: 1,
        pageSize: 5,
        count: 13,
        articleList: [],
        pageNumList: [],
    },
    computed:{
        getPage:function () {
             let _self = this;
             return function (page, pageSize) {
                 axios({
                     method: 'get',
                     url: '/queryBlogByPage?page='+ ( page - 1) + '&pageSize=' + pageSize,
                 }).then(function (res) {
                     _self.articleList = res.data.data;
                     _self.page = page;
                     for(let i in _self.articleList) {
                         _self.articleList[i].link = '/blog_detail.html?bid=' + _self.articleList[i].id;
                     }

                 }).catch(function (res) {
                     console.log('请求失败');
                 });
                 axios({
                     method: 'get',
                     url: '/queryBlogByCount',
                 }).then(function (res) {
                     // console.log(res.data.data[0]['count(1)']);
                     _self.count = res.data.data[0].count;
                     _self.generatePageTool;

                 }).catch(function (res) {
                     console.log('请求失败');
                 });
             }
        },
        generatePageTool: function () {
            let nowpage = this.page;
            let pageSize = this.pageSize;
            let total = this.count;
            let result = [];
            result.push({text: '<<', page:1});
            if (nowpage > 1) {
                result.push({text: nowpage - 1, page: nowpage - 1});
            }
            if (nowpage > 2) {
                result.push({text: nowpage - 2, page: nowpage - 2});
            }
            result.push({text: nowpage, page:nowpage});
            if (nowpage + 1 <= parseInt((total + pageSize - 1) / pageSize)) {
                result.push({text: nowpage + 1, page: nowpage + 1})
            }
            if (nowpage + 2 <= parseInt((total + pageSize - 2) / pageSize)) {
                result.push({text: nowpage + 2, page: nowpage + 2})
            }
            result.push({text: '>>', page: parseInt((total + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            return this.pageNumList;
        },
        jumpTo: function () {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
});