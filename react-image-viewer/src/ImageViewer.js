import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import ImagePanel from './components/ImagePanel';

class ImageViewer extends PureComponent {
	constructor() {
        super();
        this.domContainer = document.createElement('div');
		this.state = {};
    }
    
    componentDidMount() {
        document.body.append(this.domContainer);
    }

    componentWillUnmount() {
        document.body.removeChild(this.domContainer);
    }

	render() {
		return ReactDOM.createPortal(<ImagePanel {...this.props}/>, this.domContainer);
	}
}

export default ImageViewer;
