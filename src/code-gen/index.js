let
    _ = require("lodash"),
    jsBeautify = require('js-beautify').js,
    fse = require('fs-extra'),
    path = require('path'),
    itemTemplate = fse.readFileSync(path.join(__dirname, './template/api/item')),
    beautifyOps = {
        indent_with_tabs: true,
        max_preserve_newlines: -1
    },
    vueTemplate = fse.readFileSync(path.join(__dirname, './template/page/vue'));


module.exports = (apis) => {
    fse.removeSync("./dist");
    apis.forEach((item) => {
        let fileApis =item.value;
        if(fileApis){

            let itemResult = _.template(itemTemplate)({
                apis: fileApis,
                getParams: (item) => {
                    if (item.method.toUpperCase() === 'GET' && item.params) {
                        let results = item.params.map((item) => {
                            return `${item}=\$\{${item}\}`;
                        });
                        return `?${results.join('&')}`
                    }
                    return '';
                }
            });

            fse.outputFileSync(`./dist/api/${item.name}.js`, jsBeautify(itemResult,beautifyOps));

            let
                pages = {};

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

                Object.entries(pages).forEach((item)=>{
                    let
                        pageName = item[0],
                        apis = item[1],
                        content = _.template(vueTemplate)({
                            page:{
                                name:pageName,
                                apis
                            }
                        });
                        fse.outputFileSync(`./dist/page/${pageName}.vue`,content.replace(/<script>([\s\S]+)<\/script>/,(matched,extract,index,all)=>{
                            return matched.replace(extract, `\r\n${jsBeautify(extract,beautifyOps)}\r\n`);
                        }));
                });


        }


    });
}