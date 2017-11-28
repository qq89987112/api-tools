const events = require('events');
// 创建 eventEmitter 对象
let
    app = new events.EventEmitter(),
    plugins = require("./plugins/index");

module.exports = (apis) => {
    apis.forEach((item) => {
        let
            prefix = item.prefix || "",
            apiConfig = item.value;

        if (prefix) {
            apiConfig.forEach((item) => {
                if (item.url) {
                    let
                        parasReg = /\$\{(.+)\}/g,
                        results,
                        params = [];
                    item.url = prefix + item.url;
                    while (results = parasReg.exec(item.url)) {
                        params.push(results[1]);
                    }

                    item.params2 = params;
                }
            });
        }

    });
    app.$data = apis;
    // 插件自定义存放的数据
    app.$env = {};
    app.$emit = app.emit;
    app.$on = app.on;
    plugins = plugins.map((item) => item(app));
    plugins.forEach((item) => {
        if (item instanceof Function) {
            item();
        }
    })
};