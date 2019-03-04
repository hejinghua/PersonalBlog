var blogDetail = new Vue ({
    el: '#blog_detail',
    data: {
        bid: -1,
        title: '',
        content: '',
        ctime: '',
        tags: '',
        views: '',
    },
    computed: {

    },
    created: function () {
        let _self = this;
        let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
        if (searchUrlParams == '') return;
        if (searchUrlParams.split('=')[0] == 'bid') {
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
            url: '/queryBlogById?id=' + _self.bid,
        }).then(function (res) {
            let result = res.data.data[0];
            _self.title = result.title;
            _self.ctime = timeStampTurnTime(result.ctime);
            _self.tags = result.tags;
            _self.views = result.views;
            _self.content = result.content;

        }).catch(function (res) {
            console.log('请求失败');
        });
    }
});