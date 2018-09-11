var audioCtx;
var Pino = {
    config: {
        startVal: 220,
        names: ['A', '#A', 'B', 'C', '#C', 'D', '#D', 'E', 'F', '#F', 'G', '#G', 'a', '#a', 'b'],
        keys: [65, 87, 83, 68, 82, 70, 84, 71, 72, 85, 74, 73, 75, 79, 76],
        smapleKeys: {
            s49: 68,
            s50: 70,
            s51: 71,
            s52: 72,
            s53: 74,
            s54: 75,
            s55: 76
        }
    },
    init: function(){
        this.initKeys();
        this.addListener();
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!window.AudioContext) { 
            alert('当前浏览器不支持Web Audio API');
            return;
        }
        // 创建新的音频上下文接口
        audioCtx = new AudioContext();


        // 按钮元素
        var eleButtons = $('.key');
        // 鼠标hover我们的按钮的时候
        /*eleButtons.on('mouseenter', function () {
            var frequency = +$(this).data('tone');
            Pino.play(frequency);
        });*/
    },
    initKeys: function(){
        var start = this.config.startVal;
        var html ='',temp,templ='<div class="key &spe" style="&left" id="&board" data-tone="&key">&name</div>',speNum=0;
        for(var i=0;i<15;i++){
            temp = templ;
            temp = temp.replace('&name', this.config.names[i]).replace('&key', start+start*i/12).replace('&board', this.config.keys[i]);
            if(this.config.names[i].indexOf('#') > -1){                
                temp = temp.replace('&spe', 'spe').replace('&left', 'left:'+((i-speNum)*30 - 13)+'px');
                speNum++;
            }else{
                temp = temp.replace('&spe', '').replace('&left', '');
            }
            html += temp;
        }
        $(".keys").html(html);
    },
    play: function(frequency){
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        var oscillator = audioCtx.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        var gainNode = audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(audioCtx.destination);
        // 指定音调的类型，其他还有square|triangle|sawtooth
        oscillator.type = 'sine';
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = frequency;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(audioCtx.currentTime);
        // 1秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
        // 1秒后完全停止声音
        oscillator.stop(audioCtx.currentTime + 1);
    },
    addListener: function(){
        $(document).on('keydown',function(ev){
            key = ev.which;
            if(Pino.config.smapleKeys['s'+key]){
                key =  Pino.config.smapleKeys['s'+key];
            }
            var node = $("#"+key);
            if(!node.length) return;
            node.addClass("press");
            var frequency = +node.data('tone');
            Pino.play(frequency);
        });
        $(document).on('keyup',function(ev){
            key = ev.which;
            if(Pino.config.smapleKeys['s'+key]){
                key =  Pino.config.smapleKeys['s'+key];
            }
            var node = $("#"+key);
            if(!node.length) return;
            node.removeClass("press");
        });
    }
}
$(function(){
    Pino.init();
});