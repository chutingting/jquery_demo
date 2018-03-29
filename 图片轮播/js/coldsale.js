$(function () {
    var sts = $('#sts').val(),
        s = $('#s').val(),
        isActive = $('#isActive').val(),
        location = window.location.href,
        ua = navigator.userAgent.toLowerCase(),
        uCenter = window.userCenter;
    if(isActive == "0"){
        $('.userInfo .ownCard').show();
        $('.userInfo .getCard').hide();
        getUserNews();
    }else{
        $('.userInfo .ownCard').hide();
        $('.userInfo .getCard').show();
    }

    function getUserNews() {
        // 判断勋章是否点亮
        uCenter.getData('/info/getMedal.jhtml?sts=' + sts, function (results) {
            var data = results;
            if(typeof results == 'string'){
                data = eval("("+ results +")");
            }
            for(var i= 0,lens ;lens = data[i];i++){
                if(lens.medalId == "4414"){
                    $('.identify_btn').html('已认证').off('click');
                    $('#userSign').addClass('userSign_high');
                }
            }
        });
        // 获取乐豆
        uCenter.getData('/info/uledou.jhtml?sts=' + sts ,function(results){
            var data = results;
            if(typeof results == 'string'){
                data = eval("("+ results +")");
            }
            $("#ledou").html(data);
        });
        // 获取优惠券总数
        uCenter.getData('/info/mycounpon.jhtml?sts=' + sts ,function(results){
            var data = results;
            if(typeof results == 'string'){
                data = eval("("+ results +")");
            }
            if(data.ret == true){
                $("#saleCoupons").html(data.userCoupon.length);
            }
        });
    }

    var spread = {
        wait:60,
        phoneFlag:false,
        getMobileCodeFlag:true,
        submitFlag:true,
        $phone:$('#phone'),
        $getMobileCode:$('#getMobileCode'),
        $activate_btn:$('.activate_btn'),
        getDomain: function (url) {
            var domain = /\/\/([^\/]+)/.exec(url)[1];
            var arr = domain.split('.').slice(-3);
            //uat环境测试
            if(/lenovouat\.cn/.test(url)){
                if(/tks\.lenovouat\.cn/.test(domain)){
                    return "tks.lenovouat.cn";
                }
                if(/tk\.lenovouat\.cn/.test(domain)){
                    return "tk.lenovouat.cn";
                }
                if(/vip\.lenovouat\.cn/.test(domain)){
                    return "vip.lenovouat.cn";
                }
                return "lenovouat.cn";
            }
            if(/lenovouat\.com/.test(url)){
                if(/tks\.lenovouat\.com/.test(domain)){
                    return "tks.lenovouat.com";
                }
                if(/tk\.lenovouat\.com/.test(domain)){
                    return "tk.lenovouat.com";
                }
                if(/vip\.lenovouat\.com/.test(domain)){
                    return "vip.lenovouat.com";
                }
                return "lenovouat.com";
            }
            if(arr.length == 2){
                return domain;
            }else{
                if(arr[1] == 'com'){
                    return arr.join('.');
                }else{
                    return arr[1] + '.' + arr[2];
                }
            }
        },
        checkPhone: function (mobile,type) {
            if(mobile != null && mobile != ""){
                if (mobile.length == 11 && /^1[3-8]\d{9}$/.test(mobile)) {
                    return true;
                }
                if(type){
                    this.showMsg('手机号格式不正确', 1);
                }
                return false;
            }else{
                if(type){
                    this.showMsg('手机号格式不正确', 1);
                }
                return false;
            }
        },
        checkCaptcha: function (captcha) {
            if(captcha != ""){
                return true;
            }else{
                this.showMsg('请输入手机验证码', 1);
                return false;
            }
        },
        showMsg: function (content,closeTime) {
            $('.showMsg').html(content).fadeIn();
            setTimeout(function() {
                $(".showMsg").fadeOut('slow');
            }, closeTime * 1000);
        },
        getMobileCode: function () {
            var that = this;
            if(that.checkPhone(that.$phone.val(),1) && that.phoneFlag){
                that.$getMobileCode.html('正在获取中...');
                that.getMobileCodeFlag = false;
                $.getScript('//reg.'+ that.getDomain(location) +'/captcha/sendMsg?mobile=' + that.$phone.val() + "&sts="+ sts + "&s=" + s +'&callback=getMobile');
            }
        },
        time60: function () {
            var that = this;
            if (that.wait == 0) {
                that.getMobileCodeFlag = true;
                that.$getMobileCode.html("点击重新获取");
                that.wait = 60;
            } else {
                that.getMobileCodeFlag = false;
                that.$getMobileCode.html("重新获取(" + that.wait + "s)");
                that.wait--;
                setTimeout(function() {
                    that.time60();
                }, 1000)
            }
        },
        getGifts:function(){
            uCenter.getData('/memberInfo/showUserRight.jhtml?sts=' + sts, function (results) {
                if (results) {
                    var data = results;
                    if (typeof results == 'string') {
                        data = eval("(" + results + ")");
                    }
                    if (data.isShowRight == "0") {
                        var couponList = [], li_num = 0;
                        if (data.isNew) {
                            $('.giftsTitle').html('恭喜您获得新人礼包');
                            if (data.ledou) {
                                $("#ledouValue").html("+" + data.ledou);
                            }
                            if (data.score) {
                                li_num = 1;
                                $(".giftsList").append('<li class="li-even"><p class="rights-num" id="score">+' + data.score + '</p><p class="rights-type">消费积分</p></li>')
                            }
                            if (data.couponValue) {
                                if (li_num == 1) {
                                    for (var i = 0, couponItem; couponItem = data.couponValue[i]; i++) {
                                        if (couponItem.name.length > 14) {
                                            couponItem.name = couponItem.name.substr(0, 14) + '...';
                                        }
                                        couponList.push('<li class="li-' + ((i + 1) % 2 == 0 ? "even" : "odd") + '"><p class="rights-num" id="couponValue">' + couponItem.money + '元</p><p class="rights-type">' + couponItem.name + '</p></li>')
                                    }
                                } else {
                                    for (var i = 0, couponItem; couponItem = data.couponValue[i]; i++) {
                                        if (couponItem.name.length > 14) {
                                            couponItem.name = couponItem.name.substr(0, 14) + '...';
                                        }
                                        couponList.push('<li class="li-' + ((i + 1) % 2 == 0 ? "odd" : "even" ) + '"><p class="rights-num" id="couponValue">' + couponItem.money + '元</p><p class="rights-type">' + couponItem.name + '</p></li>')
                                    }
                                }
                                $('.giftsList').append(couponList.join(""));
                            }
                        } else {
                            $('.giftsTitle').html('恭喜您获得专享礼包');
                            $('#ledouValue').parent().hide();
                            for (var i = 0, couponItems; couponItems = data.couponValue[i]; i++) {
                                if (couponItems.name.length > 14) {
                                    couponItems.name = couponItems.name.substr(0, 14) + '...';
                                }
                                couponList.push('<li class="li-' + ((i + 1) % 2 == 0 ? "even" : "odd" ) + '"><p class="rights-num" id="couponValue">' + couponItems.money + '元</p><p class="rights-type">' + couponItems.name + '</p></li>')
                            }
                            $('.giftsList').append(couponList.join(""));
                        }
                        $('.bodyMask,.giftsDialog').fadeIn();
                    }else{
                        $('.showMsg').html('您的账号已激活会员卡').fadeIn();
                        setTimeout(function() {
                            $(".showMsg").fadeOut('slow');
                        }, 1000);
                    }
                }
            });
        },
        drawUserInfo: function () {
            var phone = $.trim(this.$phone.val());
            uCenter.getData('/memberInfo/getUser.jhtml?sts=' + sts + '&mobile=' + phone, function (data) {
                if(data){
                    $('#userName').html(data.username);
                    $('.userId').html('ID: ' + data.lenovoid);
                }
            });
        },
        lidlogin: function (tgt, username,cb) {
            var datas = {
                lpstgt : tgt,
                username : username,
                state : 'login',
                realm : 'shop.lenovo.com.cn'
            };
            this.formSubmit(location.protocol+'//passport.lenovo.com/wauthen2/tgtAccess', datas,cb)
        },
        formSubmit: function (url,data,successfn) {
            var str = [],loaded = false;
            $('body').append('<iframe class="iframepost" style="display:none;" name="iframepost"></iframe>');

            str.push('<form class="postForm" style="display:none;" target="iframepost" method="post" action="' + url +'">');
            $.each(data,function(key,value){
                if(!value) return;
                str.push('<input name="' + key + '" value="' + value + '" type="hidden"/>');
            });
            str.push('</form>');
            $('body').append(str.join(''));
            $('.postForm').submit().remove();

            $('.iframepost').on('load',function(){
                try{
                    var o = (new Function('return ' + this.contentWindow.name))();
                    $(this).remove();
                    loaded = true;
                    clearTimeout(ito);
                    if(successfn) successfn(o);
                }catch(err){
                    if(successfn) successfn({});
                }
            });
            var ito = setTimeout(function(){
                clearTimeout(ito);
                if(successfn) successfn({});
                $('.iframeBridge').remove();
            },5000);
        },
        bindEvents:function(){
            var that = this;
            $('.getCard_btn').on('click', function () {
                $('.activateDialog,.bodyMask').show();
                var h=$(window).height();
                $("body,html").css({"overflow":"hidden","height":h+"px"});
            });
            $('#activate_close,.bodyMask').on('click', function () {
                $('.activateDialog,.bodyMask').hide();
                $("body,html").css({"overflow":"auto","height":"auto"});
            });

            that.$phone.on('input blur', function () {
                if(that.checkPhone($(this).val())){
                    that.phoneFlag = true;
                }else{
                    that.phoneFlag = false;
                }
            });

            that.$getMobileCode.on('click', function () {
                if(that.getMobileCodeFlag){
                    that.getMobileCode();
                }
            });

            that.$activate_btn.on('click',function(){
                var phone = $.trim(that.$phone.val()),
                    captcha = $.trim($('#captcha').val());
                if(that.submitFlag && that.checkPhone(phone,1) && that.checkCaptcha(captcha)){
                    that.submitFlag = false;
                    $(this).html('正在激活中...');
                    $('.loading').show();
                    $.getScript('//reg.'+ that.getDomain(location)+'/auth/member/active?account='+phone + '&captcha=' + captcha + '&ticket=' + sts +'&callback=submit')
                }
            });

            $('.qb').on('click', function () {
                $('.qrcodeDialog,.bodyMask').show();
            });
            $('#qrcode_close,.bodyMask').on('click', function () {
                $('.qrcodeDialog,.bodyMask').hide();
            });

            $('.gifts_close,.bodyMask').on('click', function () {
                $('.giftsDialog,.bodyMask').hide();
            });
            $('.identify_btn').on('click',function(){
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    window.location.href = '/memberInfo//toAuth.jhtml?sts='+ sts;
                }else{
                    window.location.href = 'https://campussit.alipay-eco.com/public/card/lenovoCard-sit.html#/lenovoCard/index';
                }
            });
        },
        init: function () {
            this.bindEvents();
        }
    };
    window.getMobile = function (o) {
        if (o.ret == '0') {
            spread.time60();
        } else {
            spread.$getMobileCode.html('获取验证码');
            spread.showMsg(o.msg, 1);
        }
    };
    window.submit = function (data) {
        spread.$activate_btn.html('立即激活');
        spread.submitFlag = true;
        $('.loading').hide();
        if(data.ret == "0"){
            $('.activateDialog,.bodyMask').hide();
            spread.lidlogin(data.tgt,spread.$phone.val(),function(){
                spread.getGifts();
                spread.drawUserInfo();
                getUserNews();
                $('.ownCard').show();
                $('.getCard').hide();
            });
        }else{
            spread.showMsg(data.msg,1);
        }
    };

    spread.init();


    var swiper = new Swiper('.swiper-container', {
        //slidesPerView: 2,
        //spaceBetween : '20%'
        effect:"coverflow",/*轮播的效果：（1）fade:淡入淡出；（2）cube:立方体；（3）coverflow:立体照片*/
        slidesPerView:1,/*网格分布：1为在容器区域出现一张图；2：在容器区域出现两张图；3：在容器区域出现三张图*/
        centeredSlides:true,/*默认第一块居左，设置为true后则是居中显示*/

        coverflow: {
            rotate: 0, /*3d旋转角度设置为30度*/
            stretch: 40, /*每个slide之间的拉伸值，值越大靠得越近*/
            depth: 120, /*位置深度，值越大离Z轴越远，看起来越小*/
            modifier: 2,
            slideShadows: false,/*开启阴影*/
            //shadow: false,   //开启投影。默认 true。
        }
    });


});