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
        //网络钟的是给编辑器加鼠标点击及键盘事件，那样调用太平凡，暂时改成给编辑器添加失去焦点事件即可
        this.editorCenter.addEventListener('blur', () => {
            this.saveSelection();
        });
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