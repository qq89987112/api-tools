const events = require('events');
// 创建 eventEmitter 对象
let
    app = new events.EventEmitter(),
    plugins = require("./plugins");

module.exports = (apis)=>{
    app.$data = apis;
    // 插件自定义存放的数据
    app.$env = {};
    app.$emit = app.emit;
    app.$on = app.on;
    plugins = plugins.map((item)=>item(app));
    plugins.forEach((item)=>{
        if(item instanceof Function){
            item();
        }
    })
};