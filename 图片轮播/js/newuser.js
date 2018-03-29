
'use strict';

(function($,global){
    var userCenter = {
        //网站基础字体大小
        baseSize: function(){
            var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
            var refreshRem = function () {
                var clientWidth = window.innerWidth
                    || doc.documentElement.clientWidth
                    || doc.body.clientWidth;
                document.documentElement.style.cssText = 'font-size:' + (clientWidth / 750) * 100 + 'px';
            };
            refreshRem();
            if (!document.addEventListener) return;
            window.addEventListener(resizeEvt, refreshRem, false);
            document.addEventListener('DOMContentLoaded', refreshRem, false);
        },
        getData: function(url,cb,jsonp){
            var _index = url.indexOf("?");
            if(_index == -1){
                url = url + "?ran=" + Math.ceil(Math.random()*1000000);
            }else{
                url = url + "&ran=" + Math.ceil(Math.random()*1000000);
            }
            $.ajax({
                url: url,
                type: "POST",
                dataType: !!jsonp ? "jsonp" : "json",
                success: function(d){
                    if(cb){
                        cb(d);
                    }
                }
            })
        },
        getDataSync: function (url,cb,jsonp) {
            var _index = url.indexOf("?");
            if(_index == -1){
                url = url + "?ran=" + Math.ceil(Math.random()*1000000);
            }else{
                url = url + "&ran=" + Math.ceil(Math.random()*1000000);
            }
            $.ajax({
                url: url,
                type: "POST",
                dataType: !!jsonp ? "jsonp" : "json",
                async:false,
                success: function(d){
                    if(cb){
                        cb(d);
                    }
                }
            })
        }
    };
    userCenter.baseSize();
    global.userCenter = userCenter;
})(jQuery,window);