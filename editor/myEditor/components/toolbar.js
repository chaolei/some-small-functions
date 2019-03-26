class Toolbar {

    constructor(cls, editor) {
        let container = document.querySelector(cls);
        let barCon = document.createElement('div');
       
        barCon.setAttribute('class', 'editor-toolbar');        
        container.insertBefore(barCon, editor);

        this.initBar(barCon, editor);
    }

    initBar(barCon, editor) {
        let fragment = document.createDocumentFragment();
        let bold = document.createElement('a');
        let italic = document.createElement('a');
        let underline = document.createElement('a');
        let undo = document.createElement('a');

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
        fragment.append(italic);
        fragment.append(underline);
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
    }

}

export default Toolbar;