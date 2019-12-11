import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import JsonView from '../src/JsonView';
import JsonView from '../lib';


class Test extends Component {

    constructor() {
        super();
    }
    
    render() {
        return (
            <div className='test'>
                <JsonView/>
            </div>
        );
    }
}

ReactDOM.render(<Test />, document.getElementById('root'));
