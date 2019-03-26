import EditorMain from './components/editorMain.js';
import Toolbar from './components/toolbar.js';

class MyEditor{

    constructor(cls) {
        this.initEditor(cls);
    }

    initEditor(cls) {
        let container = document.querySelector(cls);
        let editorCon = document.createElement('div');

        this.editorName = this.getEditorName();        
        editorCon.setAttribute('class', 'editor-myEditor '+ this.editorName);        
        container.append(editorCon);

        this.editor = new EditorMain('.'+this.editorName);
        new Toolbar('.'+this.editorName, this.editor.editorCenter);        
    }

    getEditorName() {
        return 'myEditor-'+ (new Date().getTime()+'').substr(-4, 6);
    }

    getEditorContent() {
        return this.editor.getEditorContent();
    }

    clearContent() {
        this.editor.clearContent();
    }
}

export {MyEditor as Editor};