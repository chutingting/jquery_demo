function drag(b){
    m=false;
    $(b).mousedown(function(e){
        m=true;
        _x=e.pageX-$(b).offset().left; //鼠标距离左边浏览器的位置减去盒子距离左边浏览器位置
        _y=e.pageY-$(b).offset().top;  //鼠标距离上边浏览器的位置减去盒子距离上边浏览器位置
    }).mousemove(function(e){
        if(m){
            var x=e.pageX-_x;  //盒子距离浏览器左边的位置
            var y=e.pageY-_y;  //盒子距离浏览器上边的位置
            /*不让盒子超出浏览器*/
            if(x<0) x=0;
            if(y<0) y=0;
            if(x>$(window).width()-$(b).outerWidth()){
                x=$(window).width()-$(b).outerWidth();
            }
            if(y>$(window).height()-$(b).outerHeight()){
                y=$(window).height()-$(b).outerHeight();
            }
            $(b).css({left:x,top:y});
            console.log($(b).offset().left);
        }
    }).mouseup(function(){
        m=false;
        mousemove=null;
    })

}