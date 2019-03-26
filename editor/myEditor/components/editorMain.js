class EditorMain {

    constructor(cls) {
        let container = document.querySelector(cls);
        let barCon = document.createElement('div');
       
        barCon.setAttribute('class', 'editor-area');
        barCon.setAttribute('contenteditable', true);
        container.append(barCon);

        this.editorCenter = barCon;
    }

    getEditorContent() {
        return this.editorCenter.innerHTML;
    }

    clearContent() {
        this.editorCenter.innerHTML = '';
    }

}

export default EditorMain;