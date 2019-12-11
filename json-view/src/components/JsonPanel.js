import React, {PureComponent} from 'react';
import {trim} from '../utils';

const DataType = {
    FUNC: 'function',
    OBJ: 'object'
};

class JsonPanel extends PureComponent {
    
    constructor() {
        super();
        
    }
    
    initJsonView = () => {
        let {jsonstr} = this.props, jsonview;
        let fstr = trim(jsonstr);
        if(!fstr) return ; //空字符串不处理

        try {
            let json = JSON.parse(fstr);
            jsonview = this.getJsonNode(json);
        } catch (error) {
            jsonview = 'json格式错误，请修改';
        }

        return jsonview;
    }

    getJsonNode = (jsonObj, spe) => {
        if(jsonObj.length){//数组
            let type, view, data;
            return (
                <div className='json-block'>
                    <div>
                        <span className='json-switch open' onClick={this.handleObjHideShow}>-</span>
                        <span className='json-obj-start'>{'['}</span>
                        <span className='json-obj-sumary hide'>{`Array[${jsonObj.length}]`}</span>
                    </div>
                    <div className='json-obj-content'>
                        {jsonObj.map((val,index) => {
                            data = val;
                            type = typeof data, view = 'invalid';
                            switch(type){
                                case 'string': view = <span>"<span className='json-words'>{data}</span>"</span>; break;
                                case 'number': view = <span className='json-number'>{data}</span>; break;
                                case 'object': view = this.getJsonNode(data, index!=jsonObj.length-1); break;
                            }

                            return (
                                <div className='json-level' key={index}>{view} {index==jsonObj.length-1 || type == 'object'  ? '' : ','}</div>
                            )
                        })}
                        <div>{spe ? '],' : ']'}</div>
                    </div>
                </div>
            )
        }else{//对象
            let keys = Object.keys(jsonObj);
            let type, view, data;
            return (
                <div className='json-block'>
                    <div>
                        <span className='json-switch open' onClick={this.handleObjHideShow}>-</span>
                        <span className='json-obj-start'>{'{'}</span>
                        <span className='json-obj-sumary hide'>{'Object{...}'}</span>
                    </div>
                    <div className='json-obj-content'>
                        {keys.map((key, index) => {
                            data = jsonObj[key];
                            type = typeof data, view = 'invalid';

                            switch(type){
                                case 'string': view = <span>"<span className='json-words'>{data}</span>"</span>; break;
                                case 'number': view = <span className='json-number'>{data}</span>; break;
                                case 'object': view = this.getJsonNode(data, index!=keys.length-1); break;
                            }

                            return (
                                <div className='json-level' key={key}><span>"{key}"</span>: {view}</div>
                            )
                        })}
                        <div>{spe ? '},' : '}'}</div>
                    </div>
                </div>
            )
        }        
    }

    handleObjHideShow = (e) => {
        let opNode = e.target;
        let node = opNode.parentNode;
        let clsName = opNode.className;
        
        if(clsName.indexOf('open') > -1){
            opNode.setAttribute('class', 'json-switch');
            opNode.innerText = '+';

            node.querySelector('.json-obj-start').setAttribute('class', 'json-obj-start hide');
            node.querySelector('.json-obj-sumary').setAttribute('class', 'json-obj-sumary');
            node.parentNode.querySelector('.json-obj-content').setAttribute('class', 'json-obj-content hide');
        }else{
            opNode.setAttribute('class', 'json-switch open');
            opNode.innerText = '-';

            node.querySelector('.json-obj-start').setAttribute('class', 'json-obj-start');
            node.querySelector('.json-obj-sumary').setAttribute('class', 'json-obj-sumary hide');
            node.parentNode.querySelector('.json-obj-content').setAttribute('class', 'json-obj-content');
        }
    }

	render() {        
        let jsonview = this.initJsonView();

		return (
			<div className='json-view-panel'>
                {jsonview}
			</div>
		);
	}
}

export default JsonPanel;
