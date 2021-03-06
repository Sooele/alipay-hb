import FastClick from "fastclick";
import Clipboard from "clipboard";
var shareText = "快来领取支付宝跨年红包！1月1日起还有机会额外获得专享红包哦！复制此消息，打开最新版支付宝就能领取！V6WWgZ578B";
var shareUrl = 'https://qr.alipay.com/c1x03013w7bzo3nhzijjqe7';


var WechatAutoJump = {

    android: function () {
        WeixinJSBridge.invoke("jumpToInstallUrl", {}, function (e) { });
        window.close();
        WeixinJSBridge.call("closeWindow");
    },
    iOS: function () {
        window.close();
        WeixinJSBridge.call("closeWindow");
    },
    init: function () {
        if (shareUrl) {
            window.location.href = shareUrl;
        } else {
            window.close();
            WeixinJSBridge.call("closeWindow");
        }
    }

};
var uaCheck = {
    isWeixin: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    },
    isSjQQ: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/qq\//i) == "qq/" && this.isMobile()) {
            return true;
        }
        return false;
    },
    isAndroid: function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
    },
    isIphone: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
            return true;
        }
        return false;
    },
    isMobile: function () {
        return this.isAndroid() || this.isIphone();
    },
    isPc: function () {

    }
};
$(function () {
    if (uaCheck.isMobile()) {
        FastClick.attach(document.body);
        $("body").click(function () {
            new Clipboard('body', {
                text: function (trigger) {
                    return shareText;
                }
            });
        });

        if (uaCheck.isWeixin()) {
            $(".modal-tip").css("height", $(window).height);
            $(".modal-tip").show();
            return;
        }

        if (uaCheck.isSjQQ()) {
            $(".modal-tip").css("height", $(window).height);
            $(".modal-tip").show();
            if (typeof mqq.ui.openUrl != "undefined") {
                mqq.ui.openUrl({ target: 2, url: shareUrl });
            }
            return;
        }
        setTimeout(function () {
            window.location.href = shareUrl;
        }, 500);
    }
    $('#wrapper-pc').removeClass("hide");
});