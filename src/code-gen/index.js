let
    _ = require("lodash"),
    jsBeautify = require('js-beautify').js,
    fse = require('fs-extra'),
    path = require('path'),
    itemTemplate = fse.readFileSync(path.join(__dirname,'./template/item')),
    mainTemplate = fse.readFileSync(path.join(__dirname,'./template/main')),
    apis = require('../config.json');



    apis.forEach((item)=>{
        let itemResult = _.template(itemTemplate)({apis:item.value,getParams:(item)=>{
            if(item.method.toUpperCase() === 'GET' && item.params){
                let results = item.params.map((item)=>{
                    return `${item}=\$\{${item}\}`;
                });
                return `?${results.join('&')}`
            }
            return '';
        }});

        console.log(jsBeautify(itemResult));
    });

