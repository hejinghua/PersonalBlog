var randomTags = new Vue ({
    el: '#random_tags',
    data: {
        tags: ['微信','微信','微信','微信微信','微信','dsatg','ghfrj','asd','dgrke','微信','微信','微信','微信微信','微信','dsatg','ghfrj','asd','dgrke']
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
    },
    mounted: function () {

    }

});
var newHot = new Vue ({
     el: '#new_hot',
     data: {
         hotList: [
             {title: '查看你的AWS服务器已使用流量', link: 'http://www.google.com'},
             {title: '查看你的AWS服务器已使用流量', link: 'http://www.google.com'},
             {title: '查看你的AWS服务器已使用流量', link: 'http://www.google.com'},
             {title: '查看你的AWS服务器已使用流量', link: 'http://www.google.com'},
             {title: '查看你的AWS服务器已使用流量', link: 'http://www.google.com'},
             {title: '查看你的AWS服务器使用流量', link: 'http://www.google.com'}
         ]
     }
});
var newComments = new Vue ({
    el: '#new_comments',
    data: {
        commentList: [
            {name: '用户名', date: '2018-10-10', comment: '评论信息展示区'},
            {name: '许寒', date: '6天前', comment: '谢谢晓哥，我已经搞定了'}
        ]
    }
});