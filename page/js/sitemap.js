var blogList = new Vue ({
    el: '#blog_list',
    data: {
        blogList: [],
    },
    computed: {
        getAllBlog: function () {
            let _self = this;
            return function () {
                axios({
                    method: 'get',
                    url: '/queryAllBlog',
                    // params: {}
                }).then(function (res) {
                    _self.blogList =  res.data.data;

                }).catch(function (res) {
                    console.log('请求失败');
                });
            }
        }
    },
    created: function () {
        this.getAllBlog();
    }
});