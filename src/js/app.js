import FastClick from "fastclick";
import Clipboard from "clipboard";
var shareText = "快来领取支付宝跨年红包！1月1日起还有机会额外获得专享红包哦！复制此消息，打开最新版支付宝就能领取！V6WWgZ578B";
var shareCode = 'c1x03013w7bzo3nhzijjqe7';
var uaCheck = {
    isWeixin: function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    },
    isSjQQ: function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/qq\//i) == "qq/" && this.isMobile()) {
            return true;
        }
        return false;
    },
    isAndroid: function() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
    },
    isIphone: function() {
        var ua = navigator.userAgent.toLowerCase();
        if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
            return true;
        }
        return false;
    },
    isMobile: function() {
        return this.isAndroid() || this.isIphone();
    },
    isPc: function() {

    }
};
$(function() {
    FastClick.attach(document.body);
    if (uaCheck.isMobile()) {
        $("body").click(function() {
            new Clipboard('body', {
                text: function(trigger) {
                    return shareText;
                }
            });
        });
        if (uaCheck.isWeixin() || uaCheck.isSjQQ()) {
            $(".modal-tip").css("height", $(window).height);
            $(".modal-tip").show();
            return;
        }
        setTimeout(function() {
            window.location.href = "https://qr.alipay.com/" + shareCode;
        }, 500);
    }
    $('#wrapper-pc').removeClass("hide");
});