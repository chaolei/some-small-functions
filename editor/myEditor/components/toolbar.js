import Emoji from './emoji.js';

class Toolbar {

    constructor(cls, editor) {
        let container = document.querySelector(cls);
        let barCon = document.createElement('div');
        let eCon = editor.editorCenter;
       
        barCon.setAttribute('class', 'editor-toolbar');        
        container.insertBefore(barCon, eCon);

        this.initBar(barCon, eCon);
        this.editor = editor;
    }

    initBar(barCon, editor) {
        let _this = this;
        let fragment = document.createDocumentFragment();
        let bold = document.createElement('a');
        let italic = document.createElement('a');
        let underline = document.createElement('a');
        let undo = document.createElement('a');
        let emoji = new Emoji();
        let con = emoji.container;
        let eicon = emoji.icon;
        let econtent = emoji.content;

        undo.setAttribute('class', 'bar-item font-item font-undo');
        undo.setAttribute('title','撤销');
        undo.setAttribute('href','javascript:;');
        undo.innerText = '←';
        bold.setAttribute('class', 'bar-item font-item font-bold');
        bold.setAttribute('title','加粗');
        bold.setAttribute('href','javascript:;');
        bold.innerText = 'B';
        italic.setAttribute('class', 'bar-item font-item font-italic');
        italic.setAttribute('title','倾斜');
        italic.setAttribute('href','javascript:;');
        italic.innerText = 'I';
        underline.setAttribute('class', 'bar-item font-item font-underline');
        underline.setAttribute('title','下划线');
        underline.setAttribute('href','javascript:;');
        underline.innerText = 'U';

        fragment.append(undo);
        fragment.append(bold);
        fragment.append(underline);
        fragment.append(italic);        
        fragment.append(con);
        barCon.append(fragment);

        undo.addEventListener('click', () => {
            document.execCommand('undo', false, null);
            editor.focus();
        });
        bold.addEventListener('click', function(){            
            document.execCommand('bold', false, null);
            editor.focus();
        });
        italic.addEventListener('click', function(){            
            document.execCommand('italic', false, null);
            editor.focus();
        });
        underline.addEventListener('click', function(){
            document.execCommand('underline', false, null);
            editor.focus();
        });
        con.addEventListener('click', function(e){
            e.stopPropagation();
            let cnode = e.target;
            let emojiMum = cnode.getAttribute('data-enum');
            if(!emojiMum) return ;

            let eurl = `http://img.baidu.com/hi/youa/y_00${emojiMum>9 ? emojiMum : '0'+emojiMum}.gif`;
            
            //editor.focus();
            _this.editor.restoreSelection();
            document.execCommand('insertImage', false, eurl);
        });
        eicon.addEventListener('click', function(e){
            e.stopPropagation();
            let cls = econtent.getAttribute('class');
            if(cls.indexOf('open') > -1){
                econtent.setAttribute('class', cls.replace(/ open$/, ''));
            }else{
                econtent.setAttribute('class', cls + ' open');
            }
        });
        document.addEventListener('click', function(e){
            let cls = econtent.getAttribute('class');
            econtent.setAttribute('class', cls.replace(/ open$/, ''));
            if(document.querySelector('.emoji-shotcon')){
                document.querySelector('.emoji-shotcon').setAttribute('class', 'emoji-shotcon');
                document.querySelector('.emoji-tag').setAttribute('class', '');
            }
        });
    }

}

export default Toolbar;