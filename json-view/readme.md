### React JSON字符串解析组件

#### 开发环境
##### React16.9 + webpack + less

#### 一、使用方式

##### 1、安装
    npm i react-json-string-viewer -D

##### 2、使用 
    import JsonView from 'react-json-string-viewer';
    ReactDOM.render(<JsonView />, document.getElementById('root'));

#### 二、注意事项

##### 1、json字符串中key需要加双引号，否则不解析；单引号会报错。

##### 2、其他待补充


#### 三、更新记录

##### 1、0.0.3版本
###### 1）、增加对数据是null的支持
###### 2）、加入了数据错误信息提示


