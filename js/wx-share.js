(function(){
    /**
     * [initWXShareSDK 微信分享卡片]
     * config: {
     *     link: '',  // 分享链接  (选填) (默认当前链接会去掉 #后面的部分)
     *     imgUrl: '',  // 卡片图标
     *     title: '',  // 卡片标题  (选填) (默认拿 title)
     *     desc: ''  // 卡片描述
     * }
     * callback: function  // 分享成功后的回调函数  (选填)
     *
     * [注意]：
     * 需要引入 Jquery 和 wx SDK
     * <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
     */
    function initWXShareSDK(config, callback){
        if(typeof config !== 'object'){
            return false;
        }

        var url = config.link || location.href.split('#')[0];
        $.ajax({
            type: 'GET',
            url: '/wx_sign',
            dataType: 'json',
            data: {
                url: url
            },
            success: function(response){
                var appId = response.data.wx_appid;
                var timestamp = response.data.timestamp;
                var nonceStr = response.data.noncestr;
                var signature = response.data.signature;
                var title = config.title || document.title;

                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareQZone'
                    ]
                });

                wx.ready(function(){
                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: config.desc,
                        link: url,
                        imgUrl: config.imgUrl,
                        success: function(res){
                            typeof callback === 'function' && callback();
                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: config.imgUrl, // 分享图标
                        success: function(){
                            typeof callback === 'function' && callback();
                        }
                    });
                    wx.onMenuShareQQ({
                        title: title,
                        desc: config.desc,
                        link: url,
                        imgUrl: config.imgUrl,
                        success: function(){
                            typeof callback === 'function' && callback();
                        },
                        cancel: function(){
                        }
                    });
                    wx.onMenuShareQZone({
                        title: title,
                        desc: config.desc,
                        link: url,
                        imgUrl: config.imgUrl,
                        success: function(){
                            typeof callback === 'function' && callback();
                        },
                        cancel: function(){
                        }
                    });
                });
            },
            error: function(response){
            }
        });
    }

    window.initWXShareSDK = initWXShareSDK;
}());
