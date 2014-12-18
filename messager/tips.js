/**
 * 消息提示组件
 * 
 * */
var t_index = getMaxIndex();
function getMaxIndex() {
	var nodes = $("body").find("*");
	var tmp = 0,max = 0;
	nodes.each(function(){
		tmp = $(this).css("z-index") * 1;
		if(typeof tmp == "number" && tmp > max){
			max = tmp;
		}
	})
	return max;
}

function Tip(conf) {
	this.id = "tips"+new Date().getTime();
	this.node = $('<div class="lc-tips"><div class="tip-header"><div class="tip-title">系统提示</div><div class="tip-close">x</div></div></div>');
	this.node.css("z-index",t_index++);
	this.node.attr("id",this.id);
	var content = $('<div class="tip-content"></div>');
	
	content.append(conf);
	this.node.append(content);
	$('body').append(this.node);
	
	var _this = this;
	this.node.find(".tip-close").on("click",function(){_this.hide()});
	
	this.show = function(){
		this.node.fadeIn();
	}
	this.hide = function(){
		this.node.fadeOut();
	}
	return this;
}
