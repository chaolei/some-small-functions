var platName = {
    zhifubao: "支付宝",
    blank: "银行卡"
}
$(function(){
    new ClipboardJS('.modal-copy');

    $(".nav").on("click",function(){
        var _this = $(this);
        if(_this.hasClass("cur")) return ;
        $(".nav").removeClass("cur");
        _this.addClass("cur");
        var list = _this.data("list");
        $(".list-type").addClass("hide");
        $("."+list).removeClass("hide");
        if(_this.data("type")){
            $(".plat-name").text(platName[_this.data("type")]);
        }
    });

    $(".contact-btn").on("click",function(){
        $(".charge-mask").removeClass("hide");
    });

    $(".modal-close").on("click",function(){
        $(".charge-mask").addClass("hide");
    });

    $(".withdraw-money").on("click",".withdraw-num",function(){
        var money = +$(this).data("money");
        $(".withdraw-input").val(money);
    });
    $(".clear-draw").on("click",function(){
        $(".withdraw-input").val('');
    });
    
    $(".blank-name-con").on("click", function(e){
        e.stopPropagation();
        if($(".blank-name-con").hasClass("open")){
            $(".blank-name-con").removeClass("open");
        }else{
            $(".blank-name-con").addClass("open");
        }        
    });

    $(".blank-list").on("click",".blank-item",function(e){
        e.stopPropagation();
        $(".blank-name-con").removeClass("open");
        $(".blank-show").text($(this).text());
        $(".blank-name").val($(this).data("val"));
    });
    $(".withdraw-btn").on("click", function(e){
        var tips = $(".operate-tips-mask");
        tips.addClass("show");
    });
    $(".confirm").on("click", function(e){
        var tips = $(".operate-tips-mask");
        tips.addClass("show");
    });
    $(".tips-close").on("click", function(e){
        var tips = $(".operate-tips-mask");
        tips.removeClass("show");
    });
    
});