function initWXSDK() {
    var rData = data.detail;
    var title = rData.student.first_name + '/' + rData.student.nickname + '在' + rData.school_name + '与外教交流的精彩瞬间';
    var desc = '收获满满，快来围观吧～';
    var imgUrl = 'https://static-global.121learn.com/wx-share-icon.png';
    var url = location.href.split('#')[0];
    var config;
    $.ajax({
        type: 'GET',
        url: '/wx_sign',
        dataType: 'json',
        data: {
            url: url
        },
        success: function(response) {
            var appId = response.data.wx_appid;
            var timestamp = response.data.timestamp;
            var nonceStr = response.data.noncestr;
            var signature = response.data.signature;
            config = {
                debug: false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
            };
            wx.config(config);
            wx.ready(function() {
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: url,
                    imgUrl: imgUrl,
                    success: function(res) {},
                    fail: function(res) {
                        alert(JSON.stringify(res));
                    }
                });
                wx.onMenuShareTimeline({
                    title: title,
                    link: url,
                    imgUrl: imgUrl,
                    success: function() {}
                });
                wx.onMenuShareQQ({
                    title: title,
                    desc: desc,
                    link: url,
                    imgUrl: imgUrl,
                    success: function() {},
                    cancel: function() {}
                });
                wx.onMenuShareQZone({
                    title: title,
                    desc: desc,
                    link: url,
                    imgUrl: imgUrl,
                    success: function() {},
                    cancel: function() {}
                });
            });
        },
        error: function(response) {}
    });
}