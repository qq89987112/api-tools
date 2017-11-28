let
    request = require('request'),
    async = require('async'),
    jsBeautify = require('js-beautify').js,
    requests = async.queue((_item, done) => {
        let temp, item = _item.item;

        function result(error, response, body) {
            if (error) {
                states[item.url + _item.index] = "fail";
            } else {
                _item.app.$env.appResults[item.store] = JSON.parse(body);
                item.comment = jsBeautify(body).replace(/(.+)/g,"//$1");
                counter++;
                if (counter === count) {
                    _item.app.$emit('test-api-completed');
                    isEmitted = true;
                }
                states[item.url + _item.index] = "success";

                _item.app.$emit('api-result');
            }

            done();
        }

        switch (item.method.toUpperCase()) {
            case "GET":
                temp = request
                    .get(item.url, {
                        qs: _item.params
                    }, result);
                break;
            case "POST":
                break;
        }
    }, 5),
    states = {},
    count = 0,
    counter = 0,
    isEmitted = false;

process.on('exit', () => {
    if (!isEmitted) {
        console.log("程序即将结束但从未触发过'test-api-completed'事件");
    }
})

module.exports = (app) => {
    let appResults = {};
    app.$env.appResults = appResults;

    let
        apis = app.$data,
        fetch = () => {
            apis.forEach((api) => {
                let apiConfigs = api.value;
                apiConfigs.forEach((item, index) => {
                    //同一个url不同参数index肯定不一样
                    let state = states[item.url + index];

                    if (state !== "success" && state !== "doing") {


                        let
                            _item = {
                                item: item,
                                app: app,
                                index: index
                            };

                        //先进行参数检查,无外部依赖或者参数获取不报错的进入请求。
                        let paramsFrom = item.paramsFrom;

                        //如果需要参数
                        if (paramsFrom) {
                            _item.params = {};
                            let entries = Object.entries(paramsFrom);
                            for (let i = 0, len = entries.length; i < len; i++) {
                                let
                                    item = entries[i],
                                    key = item[0],
                                    value = item[1];

                                if (typeof value === 'object') {
                                    //    从input框中获取
                                    //   直接随机数就是这么叼
                                    _item.params[key] = "" + new Date().getTime();

                                } else if (typeof value === 'string' && ~value.indexOf(".")) {
                                    //    从全局results中获取
                                    let varName = value.split(".")[0];
                                    try {
                                        _item.params[key] = eval(`(function(${varName}){
                                                         return eval('${value}');
                                                      })`)(appResults[varName]);
                                    } catch (e) {
                                        // 拿不到就退出,等待下一次机会
                                        return;
                                    }

                                }
                            }
                        }

                        states[item.url + index] = "doing";
                        requests.push(_item);
                    }


                })


            });
        };

    apis.forEach((item) => {
        let apiConfigs = item.value || [];
        count += apiConfigs.length || 0;
    });
    app.$on("api-result", (results) => {
        fetch();
    });

    return () => {
        fetch();
    }
};
