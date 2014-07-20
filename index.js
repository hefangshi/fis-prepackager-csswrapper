/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

function importStyle(css, id) {
    var ele = document.createElement('style');
    ele.id = id;
    if (ele.styleSheet) {
        ele.styleSheet.cssText = css;
    } else {
        ele.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(ele);
}

function wrap(file, settings, opt){
    var content = file.getContent();
    var id = file.getId();
    content = content.replace(/\"/g, "\\\"").replace(/\r?\n/g, "\\r\\n");
    //生成样式解析函数
    var importStyleString = importStyle.toString();
    if (opt.optimize){
        importStyleString = importStyleString.replace(/\r?\n/g , '');
    }
    if(settings.template){
        //使用模版包装css
        content = String(settings.template)
            .split('${content}').join(content)
            .split('${id}').join(id);
    } else if(file.isMod) {
        //isMod文件使用amd封装并添加自执行操作
        content = 'define(\'' + id + '\', function(require, exports, module){' + importStyleString + '; importStyle("' + content + '", "' + id +'"); }); require("' + id + '")';
    } else {
        //普通文件使用自执行封装
        content = '!function(){try{ ' + importStyleString + '; importStyle("' + content + '", "' + id +'"); }catch(e){}}();';
    }
    //调整文件类型
    file.isCssLike = false;
    file.isJsLike = true;
    file.setContent(content);
}

module.exports = function (ret, conf, settings, opt) {
    fis.util.map(ret.src, function (subpath, file) {
        if (file.isCssLike && file.extras.wrapcss) {
             wrap(file, settings, opt);
        }
    });
};
