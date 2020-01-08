### React 2020祝福语拼接

#### 开发环境
##### React16.9 + webpack  + styled-component

#### 一、使用方式

##### 1、安装
    npm i react-image-viewer -D

##### 2、使用 
    import ImageViewer from 'react-image-viewer';
    ...
    <ImageViewer visible={visible} onClose={this.close} src={viewUrl}/>
    //或
    visible && <ImageViewer visible={visible} onClose={this.close} src={viewUrl}/>
    ...
##### 2、参数说明
    visible //是否展示查看窗口
    onClose //关闭查看窗口回调
    src     //图片地址
    
#### 二、注意事项



#### 三、更新记录

##### 1、0.0.1初始化版本


