let
    _ = require("lodash"),
    jsBeautify = require('js-beautify').js,
    fse = require('fs-extra'),
    path = require('path'),
    beautifyOps = {
        indent_with_tabs: true,
        max_preserve_newlines: -1
    },
    vueTemplate = fse.readFileSync(path.join(__dirname, './vue'));


module.exports = (app) => {
    app.$on("api-generated",(fileApis)=>{
        let apis = app.$data,
            apiFiles = app.$env.apiFiles;

        fse.removeSync("./dist/page");

        apis.forEach((item) => {
            // 生成page vue页面
            let
                pages = {};
            // 把所有指向同一个page的api抽取出来
            fileApis.reduce((pages,api)=>{
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
            Object.entries(pages).forEach((item)=>{

                let
                    pageName = item[0],
                    apis = item[1],
                    pageOutput = `./dist/page/${pageName}.vue`,
                    //  拿到所有 api 的依赖地址
                    dependencies = new Set(apis.map((item)=>{
                        return  `import ${item.fileName} from '${path.relative(path.dirname(pageOutput),path.dirname(apiFiles[item.fileName])).replace(/\\/g,"/")+`/${item.fileName}.js`}'`
                    })),
                    content = _.template(vueTemplate)({
                        name:pageName,
                        dependencies:Array.from(dependencies),
                        apis
                    });

                // 开始生成
                fse.outputFileSync(pageOutput,content.replace(/<script>([\s\S]+)<\/script>/,(matched,extract,index,all)=>{
                    return matched.replace(extract, `\r\n${jsBeautify(extract,beautifyOps)}\r\n`);
                }));
            });
        });
    })
};