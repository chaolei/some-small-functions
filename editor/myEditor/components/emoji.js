class Emoji {

    constructor() {
        let container = document.createElement('div');
        let emoji = document.createElement('a');
       
        container.setAttribute('class', 'bar-item emoji-con');
        emoji.setAttribute('class', 'bar-item font-item img-emoji');
        emoji.setAttribute('href','javascript:;');
        emoji.setAttribute('title','表情');

        let emojiCon = this.initEmoji();

        container.append(emoji);
        container.append(emojiCon);

        this.container = container;
        this.icon = emoji;
        this.content = emojiCon;
    }

    initEmoji() {
        let emojiCon = document.createElement('div');
        let eFrag = document.createDocumentFragment();
        emojiCon.setAttribute('class', 'emoji-content');

        let emojis;
        let titles = ["男兜", "女兜", "开心", "乖乖", "偷笑", "大笑", "抽泣", "大哭", "无奈", "滴汗", "叹气", "狂晕", "委屈", "超赞", "??", "疑问", "飞吻", "天使", "撒花", "生气", "被砸", "口水", "泪奔", "吓傻", "吐舌头", "点头", "随意吐", "旋转", "困困", "鄙视", "狂顶", "篮球", "再见", "欢迎光临", "恭喜发财", "稍等", "我在线", "恕不议价", "库房有货", "货在路上"];

        for(let i = 0; i < 40; i++){
            emojis = document.createElement('a');
            emojis.setAttribute('href','javascript:;');
            emojis.setAttribute('class', 'emoji-item');
            emojis.setAttribute('data-enum', i+1);
            emojis.setAttribute('title', titles[i]);
            emojis.style.backgroundPosition = `0 -${i*35}px`;
            eFrag.append(emojis);
        }

        emojiCon.append(eFrag);
        return emojiCon;
    }
}

export default Emoji;