function _init(){
    var getCash = document.querySelector(".cashbtn");
    var close = document.querySelector(".tips-close");

    getCash.addEventListener("click", function(){
        var tips = document.querySelector(".cash-tips-mask");
        tips.setAttribute("class", "cash-tips-mask show");
    });

    close.addEventListener("click", function(){
        var tips = document.querySelector(".cash-tips-mask");
        tips.setAttribute("class", "cash-tips-mask");
    });


} 
_init();