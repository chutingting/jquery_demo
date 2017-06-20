;(function($){

    $.fn.searchSelect = function(options){

        $("#search").show();

        var defaults = {

        };

        var options = $.extend(defaults,options);

        this.each(function(){
            var data = "";
            $.ajax({
                url : "data.json",
                type : "get",
                success : function(d){
                    var html = "";
                    data = d.datas;
                    $("#table").html("");
                    for(var i = 0 ;i< d.datas.length;i++){
                        html += "<tr><td><input type='checkbox'></td><td>"+ d.datas[i].name+"</td></tr>";
                    }
                    $("#table").append(html);
                }
            });
            $('.inputSel').on('keyup',function(){
                var arrs = [];
                for(var i=0;i<data.length;i++){
                    if(data[i].name.indexOf($(".inputSel").val()) >= 0){
                        arrs.push(data[i]);
                    }
                }
                var ohtml = "";
                $("#table").html("");
                for(var i = 0 ;i< arrs.length;i++){
                    ohtml += "<tr><td><input type='checkbox'></td><td>"+ arrs[i].name+"</td></tr>";
                }
                $("#table").append(ohtml);
            });

            $(".saveBtn").on("click",function(){
                var da = $("#table").find('tr').find("input[type=checkbox]"),res=[];
                $('input[type=checkbox]:checked').each(function(){
                   // res.push($(this).val());
                });
                 for(var i=0;i<data.length;i++){
                     if(data[i]){
                          //res.push(da[i])
                     }
                 }
                console.log(res)

            });

        })
    }

})(jQuery);