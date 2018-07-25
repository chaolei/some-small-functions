var frameId,ball;
var config = {
	y:350, //只考虑了垂直方向的位移
	speedy:1, //初始掉落速度
	speedaddy:2, //掉落加速度,
	speedNum: 0, //加速度系数
	direct: "down", //运动方向
	distance: 350, //能运动的区间距离
	reduce: 5, //每一次落地后缩减的高度，越小，弹落得越久。
	reduceNum: 2 //缩减的高度系数
}
function Ball(){
	this.constructor = function(){}
	this.ballNode = document.querySelector(".ball");
	this.init = function(){
		frameId = window.requestAnimationFrame(this.start);
	}
	this.start = function(){
		var top;
		switch(config.direct){
			case "down" : 	top = document.querySelector(".ball").offsetTop + config.speedNum * config.speedaddy + config.speedy;
							if(top >= config.y){
								document.querySelector(".ball").style.top = config.y + "px";
								if(config.distance <= 0){
									this.ball.end(); //this变成了window
								}else{
									config.distance -= config.reduce * config.reduceNum;
									config.reduceNum++;
									config.direct = "up";
									frameId = window.requestAnimationFrame(this.ball.start);
								}
							}else{
								config.speedNum++;
								document.querySelector(".ball").style.top = top + "px";
								frameId = window.requestAnimationFrame(this.ball.start); //this变成了window
							}
							break;
			case "up" : 	top = document.querySelector(".ball").offsetTop - config.speedNum * config.speedaddy - config.speedy;
							if(top <= config.y-config.distance){
								document.querySelector(".ball").style.top = (config.y-config.distance) + "px";
								config.direct = "down";
								config.speedNum = 0;
								frameId = window.requestAnimationFrame(this.ball.start);
							}else{
								config.speedNum--;
								document.querySelector(".ball").style.top = top + "px";
								frameId = window.requestAnimationFrame(this.ball.start);
							}
							break;
		}
		
	}
	this.end = function(){
		window.cancelAnimationFrame(frameId);
	}
}

function _init(){
	ball = new Ball();//由于requestAnimationFrame影响作用域，暂时还不能批量new出来进行动画，暂时不考虑了。
	ball.init();
}
