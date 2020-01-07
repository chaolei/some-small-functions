import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImageViewer from '../src/ImageViewer';

const images = [
    '//img10.360buyimg.com/ling/jfs/t1/104584/29/9412/100813/5e0dd546Ebc5eb2d5/56158227ef2e942e.jpg',
    '//img11.360buyimg.com/ling/jfs/t1/106573/23/9446/69728/5e0dd546Ed6fcd2bd/a25ef5403d068985.jpg',
    '//img20.360buyimg.com/ling/jfs/t1/89697/21/9356/52589/5e0dd546E451f3e6b/9743e1e725fc4ec0.jpg',
    '//img13.360buyimg.com/ling/jfs/t1/107190/20/3179/175405/5e0dd599E445e13cb/c18b61c6e0bbb8b5.jpg',
    '//img13.360buyimg.com/ling/jfs/t1/97205/8/9317/161649/5e0dd598Eabc9c87c/7d301276e05b8f85.jpg',
    '//img13.360buyimg.com/ling/jfs/t1/97205/8/9317/161649/5e0dd598Eabc9c87c/7d301276e05b8f85.jpg',
    '//img30.360buyimg.com/ling/jfs/t1/100794/2/9360/101207/5e0dd594E448cfc42/e4cd92331a8e1d9f.jpg'
]
class Test extends Component {

    constructor() {
        super();
        this.state = {
            viewUrl: '',
            visible: false            
        }
    }

    close = () => {
        this.setState({visible: false});
    }

    showImage= (url) => {
        this.setState({visible: true, viewUrl: url});
    }
    
    render() {
        let {viewUrl, visible} = this.state;

        return (
            <div className='test'>
                <div className='images-list'>
                    {
                        images.map((image, idx) => {
                            return <div key={idx}><img src={image} onClick={()=>this.showImage(image)} /></div>
                        })
                    }
                </div>
                <ImageViewer visible={visible} onClose={this.close} src={viewUrl}/>
            </div>
            
        );
    }
}

ReactDOM.render(<Test />, document.getElementById('root'));
