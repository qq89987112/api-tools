let
    _ = require("lodash"),
    jsBeautify = require('js-beautify').js,
    htmlBeautify = require('js-beautify').html,
    fse = require('fs-extra'),
    path = require('path'),
    beautifyOps = {
        indent_with_tabs: true,
        max_preserve_newlines: -1
    },
    vueTemplate = fse.readFileSync(path.join(__dirname, './template/vue')),
    routerIndex = fse.readFileSync(path.join(__dirname, './template/router-index'));



module.exports = (app) => {
   let baseAddr = "./dist/vue";

    app.$on('page-generated',(pagesOut)=>{
        fse.outputFileSync(`${baseAddr}/src/views/index.js`,jsBeautify(_.template(routerIndex)({pagesOut}),beautifyOps));
    });

    app.$on("api-gen-generated",(apiConfigs)=>{
        let
            apis = app.$data,
            apiFiles = app.$env.apiFiles;

            fse.removeSync(baseAddr);
            fse.copySync(path.join(__dirname,"./project-template"),baseAddr);

            apis.forEach((item) => {
                // 生成page vue页面
                let
                    pages = {},
                    // 以store里的变量为key,page为value
                    provider = {
                        "movieTheaters":"main"
                    },
                    needProvided ={
                        // "main":[
                        //     {
                        //         page:'details',
                        //         id:1,
                        //         expression:''
                        //     }
                        // ]
                    };

                    // 把所有指向同一个page的api抽取出来
                    apiConfigs.reduce((pages,api)=>{
                        let store = api.store;
                        store&&(provider[store] = api.page);


                        if(api.paramsFrom){
                           let results =  Object.entries(api.paramsFrom).reduce((prev,item)=>{
                                let value = item[1];
                                if(typeof value === 'object'&&value.from ==='route'){
                                    prev.push(item);
                                }
                            },[])

                            if (results.length > 0) {
                                needProvided[api.name] = results;
                            }
                        }


                        if(api.page){
                            api = JSON.parse(JSON.stringify(api));
                            api.fileName = item.name;
                            let page = pages[api.page] || [];
                            page.push(api);
                            pages[api.page] = page;
                        }
                        return pages;
                    },pages);

                    //遍历生成每个页面
                    let pagesOut = Object.entries(pages).reduce((prev,item)=>{

                        let
                            pageName = item[0],
                            apiConfigs = item[1],
                            pageOutput = `${baseAddr}/src/views/${pageName}.vue`,
                            form = [],
                            //  拿到所有 api-gen 的依赖地址
                            dependencies = new Set(apiConfigs.map((item)=>{
                                form = form.concat(Object.entries(item.paramsFrom||{}).filter((item)=>{
                                    let value = item[1];
                                    return typeof value === 'object';
                                }).map((item)=>{
                                    return Object.assign({
                                        name:item[0]
                                    },item[1])
                                }))
                                return  `import ${item.fileName} from '${path.relative(path.dirname(pageOutput),path.dirname(apiFiles[item.fileName])).replace(/\\/g,"/")+`/${item.fileName}.js`}'`
                            })),
                            content = _.template(vueTemplate)({
                                name:pageName,
                                dependencies:Array.from(dependencies),
                                apis: apiConfigs,
                                form
                            });

                            // 开始生成
                            fse.outputFileSync(pageOutput,content.replace(/<script>([\s\S]+)<\/script>/,(matched,extract,index,all)=>{
                                return matched.replace(extract, `\r\n${jsBeautify(extract,beautifyOps)}\r\n`);
                            }).replace(/<template>([\s\S]+)<\/template>/,(matched,extract,index,all)=>{
                                return matched.replace(extract, `\r\n${htmlBeautify(extract,Object.assign({},beautifyOps,{max_preserve_newlines:0}))}\r\n`);
                            }).replace(/^\s+/,''));
                            prev[pageName] = pageOutput;
                            return prev;
                    },{});
                    app.$emit('page-generated',pagesOut);
            });
    })
};