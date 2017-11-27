let
    request = require('request'),
    async = require('async'),
    requests = async.queue((item,done)=>{
        let temp;
        switch (item.method.toUpperCase()){
            case "GET":
                temp = request
                    .get(item.url,{
                        qs:{

                        }
                    });
                break;
            case "POST":
                break;
        }

        temp
            .on("response",(response)=>{
                done();
                console.log(response);
            })
            .on("error",(err)=>{
                done();
                console.log(err);
            });
    },5),
    states = {},
    counter = new Set();

module.exports = (app)=>{
    let
        apis = app.$data,
        counter = new Set();

    apis.forEach((item)=>{
        let apiConfigs = item.value||[];
        apiConfigs.forEach((item)=>{
            if(item.url){
                counter.push(item.url);
            }
        });
    });

    app.$on("api-result",(results)=>{

        apis.forEach((item)=>{
            let state = states[item.url];
            if(state!=="success"&&state!=="doing"){
                let
                    apiConfigs = item.value;

                    apiConfigs.forEach((item)=>{
                        //先进行参数检查,无外部依赖或者参数获取不报错的进入请求。

                        //
                        requests.push(item);
                    })
            }
        });
    });
};
