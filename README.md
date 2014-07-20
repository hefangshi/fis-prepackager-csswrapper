# fis-prepackager-csswrapper

用于将样式包装为脚本的[FIS](https://github.com/fex-team/fis/)插件

## 功能

 - 将样式包装为脚本，主要用于[Mod](https://github.com/fex-team/mod)异步加载样式
 - 也可以用于同步加载样式，但是没有实际意义，容易造成页面闪动问题

## 用法

    $ npm install -g fis-prepackager-csswrapper
    $ vi path/to/project/fis-conf.js

```javascript
//file : path/to/project/fis-conf.js
fis.config.set('modules.prepackager', 'csswrapper');

fis.config.get('roadmap.path').unshift({
	//仅匹配xxx.async.css文件
    reg: /(.*)\.async\.css/i,
    //模块化文件，可以使用Mod进行异步加载
    isMod: true,
    //开启csswrapper包装器
    extras : {
        wrapcss : true
    }
});
```