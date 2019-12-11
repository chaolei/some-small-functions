import React, {PureComponent} from 'react';
import './index.less';
import JsonPanel from './components/JsonPanel'

class JsonView extends PureComponent {
	constructor() {
		super();
		this.state = {
			jsonstr: ''
		};
	}

	changeJsonStr = (e) => {
		this.setState({jsonstr: e.target.value});
	}

	render() {		
		return (
			<div className='json-view-container'>
				<div className='json-view-input'>
					<textarea placeholder='请输入json字符串' onChange={this.changeJsonStr}></textarea>
				</div>
				<JsonPanel
					jsonstr={this.state.jsonstr}
				/>
			</div>
		);
	}
}

export default JsonView;
