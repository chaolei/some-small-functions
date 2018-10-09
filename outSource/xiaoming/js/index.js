function _init(){
    var btn1 = document.querySelector(".record1");
    var btn2 = document.querySelector(".record2");
    var list1 = document.querySelector(".data1-list");
    var list2 = document.querySelector(".data2-list");

    btn1.addEventListener("click", function(){
        var cls = btn1.getAttribute("class");
        if(cls.indexOf("cur") > -1) return ;
        btn1.setAttribute("class","btn record1 cur");
        btn2.setAttribute("class","btn record2");
        list2.setAttribute("class","data2-list hide");
        list1.setAttribute("class","data1-list");
    });

    btn2.addEventListener("click", function(){
        var cls = btn2.getAttribute("class");
        if(cls.indexOf("cur") > -1) return ;
        btn2.setAttribute("class","btn record2 cur");
        btn1.setAttribute("class","btn record1");
        list1.setAttribute("class","data1-list hide");
        list2.setAttribute("class","data2-list");
    });
} 
_init();