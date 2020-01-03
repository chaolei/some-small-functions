import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bless from '../src/Bless';


class Test extends Component {

    constructor() {
        super();
    }
    
    render() {
        return (
            <div className='test'>
                <Bless/>
            </div>
        );
    }
}

ReactDOM.render(<Test />, document.getElementById('root'));
