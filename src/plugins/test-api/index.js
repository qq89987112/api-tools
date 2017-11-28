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
                let url = item.url;
                if(_item.params){
                    let func = `(function(){
                    let ${Object.entries(_item.params).map((item)=>{
                        return `${item[0]}=${''+item[1]}`
                    }).join(',')};
                    return eval("\`${item.url}\`");
                })`;
                    url = eval(func)();
                }


                temp = request
                    .get(url, {
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
                                    value = item[1],
                                    getFromStore = (expression)=>{
                                        try{
                                            let varName = expression.split(".")[0];
                                            return eval(`(function(${varName}){
                                                         return eval('${expression}');
                                                      })`)(appResults[varName])
                                        }catch (e){
                                            return '';
                                        }

                                    };



                                if (typeof value === 'object') {
                                    //    从input框中获取
                                    //   直接随机数就是这么叼
                                    switch (value.from){
                                        case 'input':
                                            _item.params[key] = "" + new Date().getTime();
                                            break;
                                        case 'route':
                                            let result  = getFromStore(value.get);
                                            if(result){
                                                _item.params[key] = result;
                                            }else{
                                                return;
                                            }
                                            break;
                                        default:
                                            return;
                                    }


                                } else if (typeof value === 'string' && ~value.indexOf(".")) {
                                    //    从全局results中获取

                                     let result  = getFromStore(value);
                                     if(result){
                                         _item.params[key] = result;
                                     }else{
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
