class EditorMain {

    constructor(cls) {
        let container = document.querySelector(cls);
        let barCon = document.createElement('div');
       
        barCon.setAttribute('class', 'editor-area');
        barCon.setAttribute('contenteditable', true);
        container.append(barCon);

        this.editorCenter = barCon;
        this.supportRange = typeof document.createRange === 'function';
        this.addListener();
    }

    addListener() {
        /*this.editorCenter.addEventListener('mouseup', () => {
            this.saveSelection();
        });
        this.editorCenter.addEventListener('keyup', () => {
            this.saveSelection();
        });*/
        //网络中的是给编辑器加鼠标点击及键盘事件，那样调用太频繁，暂时改成给编辑器添加失去焦点事件即可
        this.editorCenter.addEventListener('blur', () => {
            this.saveSelection();
        });
        this.editorCenter.addEventListener('paste', (e) => {
            let data = e.clipboardData || e.originalEvent && e.originalEvent.clipboardData || {}
            let items = data.items;

            if(items && items.length > 0){
                this.handleImg(items, e);
            }
        });
        this.editorCenter.addEventListener('keydown', (e) => {
            let code = e.key;
            console.log(code);
            if(code == '/'){
                e.preventDefault();
                this.handleInputEmoji();
            }
        });
        this.editorCenter.addEventListener('keyup', (e) => {
            this.handleEmojiFilter(e.key);
        });
    }

    handleInputEmoji() {
        document.execCommand('insertHTML', null, '<span class="emoji-tag">/<span>');
        let inode = document.querySelector('.emoji-tag');
        let eNode = document.querySelector('.emoji-shotcon');
        if(!eNode){
            eNode = this.initEmojiShot();
        }

        eNode.style.left = `${inode.offsetLeft + 10}px`;
        eNode.style.top = `${-(205 - inode.offsetTop)}px`;

        eNode.setAttribute('class', 'emoji-shotcon open');
    }

    handleEmojiFilter(code) {
        let tag = document.querySelector('.emoji-tag');
        if(!tag || tag.innerText.indexOf('/') == -1 || tag.innerText.length > 4) {
            document.querySelector('.emoji-shotcon')?document.querySelector('.emoji-shotcon').setAttribute('class', 'emoji-shotcon'): '';
            document.querySelector('.emoji-tag')?document.querySelector('.emoji-tag').removeAttribute('class'):'';
            return;
        }

        let inputCode = tag.innerText;
        let emojis = document.querySelectorAll('.shotEmoji-item'), emojiNode, emojiTxt;

        for(let i=0; i< emojis.length; i++){
            emojiNode = emojis[i];
            emojiTxt = emojiNode.innerText;
            if(emojiTxt.indexOf(inputCode) > -1){
                emojiNode.style.display = 'block';
                if(emojiTxt == inputCode){
                    this.insertEmoji(emojiNode.getAttribute('data-enum'));
                }                
            }else{
                emojiNode.style.display = 'none';  
            }
        }
    }

    initEmojiShot() {      
        let barCon = document.createElement('div');
        barCon.setAttribute('class', 'emoji-shotcon');
        let eFrag = document.createDocumentFragment();

        let emojis;
        let titles = ["男兜", "女兜", "开心", "乖乖", "偷笑", "大笑", "抽泣", "大哭", "无奈", "滴汗", "叹气", "狂晕", "委屈", "超赞", "??", "疑问", "飞吻", "天使", "撒花", "生气", "被砸", "口水", "泪奔", "吓傻", "吐舌头", "点头", "随意吐", "旋转", "困困", "鄙视", "狂顶", "篮球", "再见", "欢迎光临", "恭喜发财", "稍等", "我在线", "恕不议价", "库房有货", "货在路上"];

        for(let i = 0; i < 40; i++){
            emojis = document.createElement('a');
            emojis.setAttribute('href','javascript:;');
            emojis.setAttribute('class', 'shotEmoji-item');
            emojis.setAttribute('data-enum', i+1);
            emojis.setAttribute('title', titles[i]);
            emojis.style.backgroundPosition = `0 -${i*35}px`;
            emojis.innerText = `/${i > 8 ? i+1 : '0'+(i+1)}`;
            eFrag.append(emojis);
        }

        barCon.append(eFrag);
        document.querySelector('.editor-myEditor').append(barCon);

        this.addEmojiListener();

        return barCon;
    }

    insertEmoji(emojiMum, enode) {
        if(!emojiMum) return ;

        if(!enode) {
            enode = document.querySelector('.emoji-shotcon');
        }

        let eurl = `http://img.baidu.com/hi/youa/y_00${emojiMum>9 ? emojiMum : '0'+emojiMum}.gif`;
        
        //_this.editor.restoreSelection();
        document.querySelector('.emoji-tag').remove();
        document.execCommand('insertImage', false, eurl);
        enode.setAttribute('class', 'emoji-shotcon');
    }

    addEmojiListener() {
        let enode = document.querySelector('.emoji-shotcon');
        enode.addEventListener('click', (e) => {
            e.stopPropagation();
            let cnode = e.target;
            let emojiMum = cnode.getAttribute('data-enum');
            this.insertEmoji(emojiMum, enode);
        });
    }

    handleImg(items, e) {
        let imgList = [], imgItem, file, reader, _this = this;
        for (var i = 0; i < items.length; ++i) {
            imgItem = items[i];
            if (imgItem.kind == 'file' && imgItem.type.indexOf('image/') !== -1) {
                e.preventDefault();
                file = imgItem.getAsFile();
                reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    _this.insertLinkImg(reader.result);
                };
            }    
        }
        if(imgList.length == 0) return ;
        this.handleImg(imgList);
    }

    insertLinkImg(imgLink) {
        if(!imgLink) return ;
        document.execCommand('insertHTML', null, '<img src="' + imgLink + '" style="max-width:100%;"/>');
    }

    /* 获取当前光标位置或选中区域 */
    getCurrentRange() {
        let selection, range;
        if(this.supportRange){
            selection = document.getSelection();
            if (selection.getRangeAt && selection.rangeCount) {
                range = selection.getRangeAt(0);
            }
        }else{
            range = document.selection.createRange();
        }

        return range;
    }

    saveSelection() {
        this.currentRange = this.getCurrentRange();
    }

    restoreSelection() {
        let currentRange = this.currentRange;

        if(!currentRange){
            //当编辑器没有得到过焦点时。没有选区，直接让编辑器得到焦点即可。解决一来就发表情的情况
            this.editorCenter.focus();
            return;
        }
        let selection, range;

        if(this.supportRange){
            selection = document.getSelection();
            selection.removeAllRanges(); //删除当前的位置或选区
            selection.addRange(currentRange); //恢复保存的
        }else{
            range = document.selection.createRange();
            range.setEndPoint('EndToEnd', currentRange);
            if(currentRange.text.length === 0){
                range.collapse(false);
            }else{
                range.setEndPoint('StartToStart', currentRange);
            }
            range.select();
        }
    }

    getEditorContent() {
        return this.editorCenter.innerHTML;
    }

    clearContent() {
        this.editorCenter.innerHTML = '';
    }

}

export default EditorMain;