let
    request = require('request'),
    async = require('async'),
    requests = async.queue((item,done)=>{
        let temp;
        switch (item.method.toUpperCase()){
            case "GET":
                temp = request
                    .get(item.url);
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
    },5);

module.exports = (app)=>{

    return ()=>{
        let apis = app.$data
        apis.forEach((item)=>{
            let
                apiConfigs = item.value;

                apiConfigs.forEach((item)=>{
                    requests.push(item);
                })

        });

    }

};
