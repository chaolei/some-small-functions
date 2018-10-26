var platName = {
    zhifubao: "支付宝",
    weixin: "微信",
    qq: "QQ",
    jd: "京东",
    blank: "银联"
}
$(function(){
    new ClipboardJS('.copyinfo');
    new ClipboardJS('.copyacount1');
    new ClipboardJS('.copyacount2');

    $(".nav").on("click",function(){
        var _this = $(this);
        if(_this.hasClass("cur")) return ;
        $(".nav").removeClass("cur");
        _this.addClass("cur");
        var list = _this.data("list");
        $(".list-type").addClass("hide");
        $("."+list).removeClass("hide");
        if(_this.data("type")){
            $("."+list).find(".cash-tips").attr("class", "cash-tips "+_this.data("type"));
            $(".plat-name").text(platName[_this.data("type")]);
        }
    });
    $(".gov-btns").on("click",".charge",function(){
        $(".charge-mask").removeClass("hide");
    });
    $(".modal-close").on("click",function(){
        $(".charge-mask").addClass("hide");
    });
    $(".other-charge").on("click",".charge-money",function(){
        var money = +$(this).data("money");
        var now = parseInt($(".other-charge-input").val());
        var result = isNaN(now)?money:now+money;
        $(".other-charge-input").val(result);
    });
    $(".clearinput").on("click",function(){
        $(".other-charge-input").val('');
    });
    $(".blank-charge").on("click",".charge-money",function(){
        $(".blank-charge .charge-money").removeClass("cur");
        $(this).addClass("cur");
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