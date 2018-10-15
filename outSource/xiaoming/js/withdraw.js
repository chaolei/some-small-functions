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
});