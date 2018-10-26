var curshow = 1, total = 3, moveFlag = false, startY, startTime, step = window.window.innerHeight;
var wraper = document.querySelector('.slide-wrap');
function addSlideEvent(){
    wraper.addEventListener("mousedown",function(e){
        wraper.style.transition = "none 0.3s ease";
        startTime = new Date().getTime();
        startY = e.clientY;
        moveFlag = true;
    });
    wraper.addEventListener("touchstart",function(e){
        wraper.style.transition = "none 0.3s ease";
        startTime = new Date().getTime();
        startY = e.changedTouches[0].clientY;
        moveFlag = true;
    });
    wraper.addEventListener("mouseup",function(e){
        var ml = e.clientY - startY;
        var endTime = new Date().getTime();
        var sep = endTime - startTime;
        var derect;
        if(sep <= 300){//直接翻页
            derect = ml > 0 ? 'up' : 'down';
            num = checkCurShow(derect);            
        }else{//判断移动距离，大于三分之一算翻页
            var ml2 = Math.abs(ml);
            if(ml2 > 1/3*step){
                derect = ml > 0 ? 'up' : 'down';
                num = checkCurShow(derect);
            }else{
                num = curshow;
            }
        }

        slide(num);        
        moveFlag = false;
    });
    wraper.addEventListener("touchend",function(e){
        var ml = e.changedTouches[0].clientY - startY;
        var endTime = new Date().getTime();
        var sep = endTime - startTime;
        var derect;
        if(sep <= 300){//直接翻页
            derect = ml > 0 ? 'up' : 'down';
            num = checkCurShow(derect);            
        }else{//判断移动距离，大于三分之一算翻页
            var ml2 = Math.abs(ml);
            if(ml2 > 1/3*step){
                derect = ml > 0 ? 'up' : 'down';
                num = checkCurShow(derect);
            }else{
                num = curshow;
            }
        }

        slide(num);        
        moveFlag = false;
    });
    wraper.addEventListener("mousemove",function(e){
        if(!moveFlag) return;
        var ml = e.clientY - startY;
        var base = -(curshow-1)*step
        wraper.style.transform = "translate(0,"+(base+ml)+"px)";
    });
    wraper.addEventListener("touchmove",function(e){
        if(!moveFlag) return;
        var ml = e.changedTouches[0].clientY - startY;
        var base = -(curshow-1)*step
        wraper.style.transform = "translate(0,"+(base+ml)+"px)";
    });
}

function slide(num){
    wraper.style.transform = "translate(0,"+(-(num-1)*step)+"px)";
    wraper.style.transition = "transform 0.3s ease";
}

function checkCurShow(derect){
    var num;
    switch(derect){
        case 'up' : num = curshow==1?1:--curshow; break;
        case 'down' : num = curshow==total?total:++curshow; break;
    }
    return num;
}

addSlideEvent();