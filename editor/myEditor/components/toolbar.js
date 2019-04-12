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
        this.tables = {};
    }

    initTable() {
        let addIco = document.createElement('a'); 
        let addCon = document.createElement('div');
        let cellCon = document.createElement('div');
        let cellItems = document.createElement('div');
        let cellSelected = document.createElement('div');

        let cellInfo = document.createElement('div');
        let cellInfo1 = document.createElement('span');
        let cellInfo2 = document.createElement('span');
        let cellInfo3 = document.createElement('span');
        let cellInfo4 = document.createElement('span');

        addIco.setAttribute('class', 'bar-item table-item add-table');
        addIco.setAttribute('title','插入表格');
        addIco.setAttribute('href','javascript:;');

        addCon.setAttribute('class', 'bar-item table-con');
        cellCon.setAttribute('class', 'cell-con');
        cellItems.setAttribute('class', 'cell-items');
        cellSelected.setAttribute('class', 'cell-selected');

        cellInfo.setAttribute('class', 'cell-info');
        cellInfo1.setAttribute('class', 'cell-info-h');
        cellInfo1.innerText = '0';
        cellInfo2.innerText = ' 行 x ';
        cellInfo3.setAttribute('class', 'cell-info-v');
        cellInfo3.innerText = '0';
        cellInfo4.innerText = ' 列';

        cellInfo.append(cellInfo1);
        cellInfo.append(cellInfo2);
        cellInfo.append(cellInfo3);
        cellInfo.append(cellInfo4);

        cellItems.append(cellSelected); 
        cellCon.append(cellInfo);
        cellCon.append(cellItems);
        addCon.append(addIco);
        addCon.append(cellCon);

        return addCon;
    }

    initBar(barCon, editor) {
        let _this = this;
        let fragment = document.createDocumentFragment();
        let bold = document.createElement('a');
        let italic = document.createElement('a');
        let underline = document.createElement('a');
        let undo = document.createElement('a');

        let addTab = this.initTable();;
        let delTab = document.createElement('a');
        let combineCell = document.createElement('a');
        let splitCell = document.createElement('a');


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

        delTab.setAttribute('class', 'bar-item table-item del-table');
        delTab.setAttribute('title','删除表格');
        delTab.setAttribute('href','javascript:;');
        combineCell.setAttribute('class', 'bar-item table-item combine-cell');
        combineCell.setAttribute('title','合并单元格');
        combineCell.setAttribute('href','javascript:;');
        splitCell.setAttribute('class', 'bar-item table-item split-cell');
        splitCell.setAttribute('title','拆分单元格');
        splitCell.setAttribute('href','javascript:;');

        fragment.append(undo);
        fragment.append(bold);
        fragment.append(underline);
        fragment.append(italic);        
        fragment.append(con);
        fragment.append(addTab);
        fragment.append(delTab);
        fragment.append(combineCell);
        fragment.append(splitCell);
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
        addTab.addEventListener('click', function(e){
            e.stopPropagation();
            let cNode = e.target;
            _this.handleTableEvent(cNode);            
        });

        delTab.addEventListener('click', function(e){
            e.stopPropagation();
            _this.deleteTable();
        });
        combineCell.addEventListener('click', function(e){
            e.stopPropagation();
            _this.combineCell();
        });
        splitCell.addEventListener('click', function(e){
            e.stopPropagation();
            _this.splitCell();
        });

        addTab.addEventListener('mousemove', function(e){
            let cNode = e.target;
            if(cNode.getAttribute('class').indexOf('cell-items') > -1 || cNode.getAttribute('class').indexOf('cell-selected') > -1){
                _this.handleSelectedCells(e);
            }            
        });

        document.addEventListener('click', function(e){
            let cls = econtent.getAttribute('class');
            econtent.setAttribute('class', cls.replace(/ open$/, ''));
            document.querySelector('.cell-con').setAttribute('class', 'cell-con');

            if(document.querySelector('.emoji-shotcon')){
                document.querySelector('.emoji-shotcon').setAttribute('class', 'emoji-shotcon');                
            }
            if(document.querySelector('.emoji-tag')){
                document.querySelector('.emoji-tag').removeAttribute('class');
            }
        });
    }

    combineCell() {
        if(!document.querySelector('.selected-td')) return ;//没有选中单元格

        let {sh, sNum} = this.selectStart;
        let {eh, eNum} = this.selectEnd;
        let combineh = Math.abs(eh - sh) + 1;
        let combinecol = Math.abs(eNum - sNum) + 1;

        let tdNodes = document.querySelectorAll('.selected-td'), tdNode;
        for(let i=0; i<tdNodes.length; i++) {
            tdNode = tdNodes[i];
            if(i == 0) {
                tdNode.setAttribute('rowspan', combineh);
                tdNode.setAttribute('colspan', combinecol);
                tdNode.removeAttribute('class');
            }else {
                tdNode.remove();
            }
        }

        this.editor.restoreSelection();
    }

    splitCell() {
        let td = this.focusTd;
        if(!td) {
            this.editor.restoreSelection();
            return ;
        }

        let rows = td.getAttribute('rowspan');
        let cols = td.getAttribute('colspan');

        if((!rows || rows == '1') && (!cols || cols == '1')) return ;//没有合并不能拆分

        let sh = td.parentNode.rowIndex;
        let std = td.cellIndex;

        let fragment1;
        let colNum, ntd, targetNode, parentNode;

        for(let i=0; i<rows; i++) {
            colNum = i == 0 ? cols - 1 : cols;
            fragment1 = document.createDocumentFragment();
            for(let m=0; m<colNum; m++){
                ntd = document.createElement('td');
                fragment1.append(ntd);
            }

            if(i == 0) {
                parentNode = td.parentNode
                targetNode = td;
                if(targetNode.nextSibling){
                    parentNode.insertBefore(fragment1, targetNode.nextSibling);
                }else{
                    parentNode.append(fragment1);
                }                
            }else{
                parentNode = parentNode.nextSibling;
                targetNode = parentNode.querySelectorAll('td')[std];
                parentNode.insertBefore(fragment1, targetNode)
            }
        }

        td.removeAttribute('rowspan', '');
        td.removeAttribute('colspan', '');
    }

    handleTableEvent(cnode) {
        let cls = cnode.getAttribute('class');
        let con = document.querySelector('.cell-con');

        if(cls.indexOf('add-table') > -1){//切换出table            
            
            let conCls = con.getAttribute('class');
            if(conCls.indexOf('open') > -1){
                con.setAttribute('class', 'cell-con');
            }else{
                con.setAttribute('class', conCls + ' open');
            }
        }else if(cls.indexOf('cell-items') > -1 || cls.indexOf('cell-selected') > -1){//选取完成插入
            
            let hnum = +document.querySelector('.cell-info-h').innerText;
            let vnum = +document.querySelector('.cell-info-v').innerText;

            if(hnum > 0 & vnum > 0){
                con.setAttribute('class', 'cell-con');
                document.querySelector('.cell-info-h').innerText = '0';
                document.querySelector('.cell-info-v').innerText = '0';

                let selectedNode = document.querySelector('.cell-selected');
                selectedNode.style.width = '0px';
                selectedNode.style.height = '0px';

                this.insertTable(hnum, vnum);
            }
        }
    }

    insertTable(hnum, vnum) {
        let bar = document.querySelector('.editor-toolbar');
        let editorWitdh = bar.offsetWidth - 20;
        let tdW = Math.floor(editorWitdh / vnum);
        let tid = 'table-' + new Date().getTime();
        let tableStr = `<table class="inserted-table ${tid}">`;
        for(let i=0; i<hnum; i++) {
            tableStr += '<tr>';
            for(let j=0; j<vnum; j++) {
                tableStr += `<td width='${tdW}'></td>`;
            }
            tableStr += '</tr>';
        }

        tableStr += '</table></br>';

        this.editor.restoreSelection();
        document.execCommand('insertHTML', null, tableStr);

        this.tables[tid] = tid;
        this.addTableEvent(tid);
    }

    deleteTable() {
        let tid = this.activeTable;
        if(!tid) {
            this.editor.restoreSelection();
            return;
        }
        let table = document.querySelector('.'+tid);
        //table.removeEventListener('mousemove');
        //table.removeEventListener('mousedown');
        table.remove();
        this.activeTable = null;
        this.editor.restoreSelection();
    }

    addTableEvent(tid) {
        let _this = this;
        let table = document.querySelector('.'+tid);
        table.addEventListener('mousedown',function(e){
            _this.activeTable = tid;
            _this.selectTable = true;

            let tds = table.querySelectorAll('td')
            for(let i=0; i<tds.length ; i++) {
                tds[i].removeAttribute('class');
            }

            if(e.target.localName == 'td'){
                _this.focusTd = e.target;
                _this.selectStart = _this.selectStart || {};
                _this.selectStart.sh = e.target.parentNode.rowIndex,
                _this.selectStart.sNum = e.target.cellIndex;
            }
        });
        table.addEventListener('blur',function(){
            _this.activeTable = null;
        });
        table.addEventListener('mousemove',function(e){
            if(!_this.selectTable) return ;
            if(e.target.localName == 'td'){
                _this.selectEnd = _this.selectEnd || {};
                _this.selectEnd.eh = e.target.parentNode.rowIndex,
                _this.selectEnd.eNum = e.target.cellIndex;
            }
            _this.showSelectedTd();
        });
        table.addEventListener('mouseup',function(e){
            //if(document.querySelector('.selected-td')) _this.editor.restoreSelection();
            _this.selectTable = false;           
        });
    }

    showSelectedTd() {
        let {sh, sNum} = this.selectStart;
        let {eh, eNum} = this.selectEnd;
        let table = document.querySelector('.'+ this.activeTable);
        if(!table) return ;
        
        let srow = Math.min(sh, eh);
        let erow = Math.max(sh, eh);
        let scol = Math.min(sNum, eNum);
        let ecol = Math.max(sNum, eNum);        

        let tds = table.querySelectorAll('td'), td, rNum, cIndex;
        if(srow == erow && scol == ecol) {
            for(let i=0; i<tds.length ; i++) {
                td = tds[i];
                td.removeAttribute('class');
            }
        }else{
            //TODO 考虑有合并单元格的情况
            let rows, cols, speCells = [], speEndRow, speEndCol, comFlag;
            for(let i=0; i<tds.length ; i++) {
                td = tds[i];
                rNum = td.parentNode.rowIndex;
                cIndex = td.cellIndex;
                rows = td.getAttribute('rowspan');
                cols = td.getAttribute('colspan');
                console.log('1--',srow,scol,erow,ecol)
                if(rows || cols) {
                    if(cIndex > ecol || cIndex < scol || rNum > erow || rNum> srow) continue;

                    if(rows) {
                        speEndRow = +rows + rNum - 1;
                        erow = speEndRow > erow ? speEndRow : erow;
                    }

                    if(cols) {
                        speEndCol = +cols + cIndex - 1;
                        ecol = speEndCol > ecol ? speEndCol : ecol;
                    }

                    speCells.push({
                        rNum: rNum, 
                        rows: rows, 
                        cols: cols,
                        cIndex: cIndex
                    });                    
                }

                if(rNum == erow && cIndex == ecol){
                    break;
                }
            }
            //console.log(srow,scol,erow,ecol,speCells);
            console.log('2--',srow,scol,erow,ecol)
            for(let i=0; i<tds.length ; i++) {
                td = tds[i];
                rNum = td.parentNode.rowIndex;
                cIndex = td.cellIndex;
                rows = td.getAttribute('rowspan');
                cols = td.getAttribute('colspan');
                
                if(rNum >= srow && rNum <= erow && cIndex >= scol && cIndex <= ecol){
                    comFlag = this.handleSpecialCell(speCells, rNum, cIndex, ecol);
                    if(comFlag){
                        td.setAttribute('class', 'selected-td');
                    }else{
                        td.removeAttribute('class');
                    }
                }else{
                    td.removeAttribute('class');
                }
            }
        } 
    }

    handleSpecialCell(speCells, rNum, cIndex) {
        let flag = true, speCell, speCol;
        for(let s=0; s<speCells.length; s++){
            speCell = speCells[s];

            if(speCell.rNum == rNum && speCell.cols && speCell.cIndex != cIndex && speCell.cIndex < cIndex && ((speCell.cIndex + speCell.cols) > cIndex)){//同一行，有选择多列的情况
                flag = false;
            }
            if(speCells.rows && (speCell.rNum + speCells.rows > rNum) ){
                speCol = speCell.cols ? (speCell.cIndex+speCell.cols-1) : speCell.cIndex;
                if(cIndex <= speCol){
                    flag = false;
                }
            }
        }

        return flag
    }

    handleSelectedCells(event) {

        let w = event.offsetX;
        let h = event.offsetY;
        let vNum = Math.ceil(w / 22);
        let hNum = Math.ceil(h / 22);

        document.querySelector('.cell-info-h').innerText = hNum;
        document.querySelector('.cell-info-v').innerText = vNum;

        let selectedNode = document.querySelector('.cell-selected');
        selectedNode.style.width = `${vNum * 22}px`;
        selectedNode.style.height = `${hNum * 22}px`;
    }

}

export default Toolbar;