import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {Container, TitleBar, Content, CloseBtn, Loading, ImageOP} from './ImageStyle';

class ImagePanel extends PureComponent {
	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            per: 100,
            url: props.src
        };
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight - 30;
        this.originWidth = 0;
        this.originHeight = 0;
        this.timer = null;
        this.mouseDown = false;
        this.startX = 0;
        this.startY = 0;
    }

    componentDidMount() {
        this.initShowImage(this.props.src);
        this.bindEvent();
    }

    bindEvent = () => {
        let _this = this;

        window.onresize = function() {
            window.clearTimeout(_this.timer);

            _this.winWidth = window.innerWidth;
            _this.winHeight = window.innerHeight - 30;
            _this.timer = window.setTimeout(() => _this.initShowImage(_this.props.src), 200);
        }

        document.addEventListener('mousemove', function(e){
            if(!_this.mouseDown) return ;

            let {left, top} = _this.state;
            left += e.clientX - _this.startX;
            top += e.clientY - _this.startY;

            _this.setState({left: left, top: top});
            _this.startX = e.clientX;
            _this.startY = e.clientY;
            _this.moved = true;
        });

        document.addEventListener('mouseup', function(){
            _this.mouseDown = false;
        });
    }

    startMove = (e) => {
        this.mouseDown = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        e.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.src != this.props.src && nextProps.src){
            this.setState({loading: true});
            this.initShowImage(nextProps.src);
        }
    }

    initShowImage = (url) => {
        let image = new Image();
        image.src = url;
        if(image.complete){
            this.handleImgShow(image.width, image.height);
        }else{
            image.onload = () => {
                this.handleImgShow(image.width, image.height);
            }
        }        
    }

    handleImgShow = (width, height) => {
        let imageInfo = null;
        this.originWidth = width;
        this.originHeight = height;
        
        if(width > this.winWidth){ //图片宽度大于窗口宽度
            imageInfo = this.handleWidthScale(width, height);
        }else{
            imageInfo = this.handleHeightScale(width, height);
        }

        this.setState(imageInfo);
    }

    handleWidthScale = (width, height) => {
        let info = null;
        let perW = this.winWidth / width;

        if(height > this.winHeight){//图片高度大于窗口高度，且图片宽度也大于窗口宽度
            let perH = this.winHeight / height;

            if(perW > perH){//宽度比例大于高度比例，以高度缩小为主
                let newWidth = Math.floor(width * perH);
                info = {
                    width: newWidth,
                    height: this.winHeight,
                    per: perH.toFixed(2) * 100,
                    left: Math.floor((this.winWidth - newWidth) / 2),
                    top: 0,
                    loading: false
                }
            }else{
                let newHeight = Math.floor(height * perW);
                info = {
                    width: this.winWidth,
                    height: newHeight,
                    per: perW.toFixed(2) * 100,
                    left: 0,
                    top: Math.floor((this.winHeight - newHeight) / 2),
                    loading: false
                }
            }            
        }else{
            let newHeight = Math.floor(height * perW);
            info = {
                width: this.winWidth,
                height: newHeight,
                per: perW.toFixed(2) * 100,
                left: 0,
                top: Math.floor((this.winHeight - newHeight) / 2),
                loading: false
            }
        }

        return info;
    }

    handleHeightScale = (width, height) => {
        let info = null;
        
        if(height > this.winHeight){//图片高度大于窗口高度
            let per = this.winHeight / height;
            let newWidth = Math.floor(width * per);
            info = {
                width: newWidth,
                height: this.winHeight,
                per: per.toFixed(2) * 100,
                left: Math.floor((this.winWidth - newWidth) / 2),
                top: 0,
                loading: false
            }
        }else{
            info = {
                width: width,
                height: height,
                per: 100,
                left: Math.floor((this.winWidth - width) / 2),
                top: Math.floor((this.winHeight - height) / 2),
                loading: false
            }
        }

        return info;
    }

    scaleBig = () => {
        let {per} = this.state;
        per += 10;

        this.handleScaleImage(per);
    }

    scaleSmall = () => {
        let {per} = this.state;
        per -= 10;
        if(per <= 0) return ;

        this.handleScaleImage(per);
    }

    handleScaleImage = (per) => {
        let newW = Math.floor(this.originWidth * per / 100);
        let newH = Math.floor(this.originHeight * per / 100);

        let info = {
            width: newW, 
            height: newH,
            per: per
        }

        if(!this.moved){//没移动过图片，在屏幕中间缩放
            info.left = Math.floor((this.winWidth - newW) / 2);
            info.top = Math.floor((this.winHeight - newH) / 2);
        }

        this.setState(info);
    }

    scaleDefault = () => {
        this.moved = false;
        this.initShowImage(this.props.src);
    }

	render() {
        let {loading, width, height, left, top, per} = this.state;
        return (
            <Container visible={this.props.visible}>
                <TitleBar>
                    <div>{this.props.title || '测试图片'}</div>
                    <CloseBtn onClick={this.props.onClose}>x</CloseBtn>
                </TitleBar>
                <Content>
                    {!loading && <img onMouseDown={this.startMove} src={this.props.src} style={{width: `${width}px`, height: `${height}px`, left: `${left}px`, top: `${top}px`}}/>}
                    {!loading && 
                        <ImageOP>
                            <span onClick={this.scaleBig}>放大</span>
                            <span onClick={this.scaleSmall}>缩小</span>
                            <span onClick={this.scaleDefault}>默认</span>
                            <span>当前比例：{`${per.toFixed(0)}%`}</span>
                        </ImageOP>
                    }
                    {loading && <Loading>loading...</Loading>}
                </Content>
            </Container>
        );
	}
}

export default ImagePanel;
