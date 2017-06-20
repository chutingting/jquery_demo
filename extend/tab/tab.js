
;(function($){
    $.fn.tab = function(options){

        var defaults = {
            className : "current",
            tabNav : ".tab_nav>li",
            tabContent : ".tab_content>div"
        };

        var options = $.extend(defaults,options);

        this.each(function(){

            //各种功能 功能代码
            var _this = $(this);
            /*_this.find('.tab_nav>li').click(function(){
                $(this).addClass('current').siblings().removeClass('current');

                var index = $(this).index();
                _this.find('.tab_content>div').eq(index).show().siblings().hide();

            });*/
            $(options.tabNav).eq(0).addClass(options.className);
            _this.find(options.tabNav).click(function(){
                $(this).addClass(options.className).siblings().removeClass(options.className);

                var index = $(this).index();
                _this.find(options.tabContent).eq(index).show().siblings().hide();

            });


        });

        return this;
    }



})(jQuery);