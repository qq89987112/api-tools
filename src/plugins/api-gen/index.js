let
    _ = require("lodash"),
    jsBeautify = require('js-beautify').js,
    fse = require('fs-extra'),
    path = require('path'),
    itemTemplate = fse.readFileSync(path.join(__dirname, './item')),
    beautifyOps = {
        indent_with_tabs: true,
        max_preserve_newlines: -1
    };


module.exports = (app) => {
    let generate = () => {
        let apis = app.$data,
            baseAddr = "./dist/api";
        fse.removeSync(baseAddr);
        let apiFiles = app.$env.apiFiles = apis.reduce((prev, item) => Object.assign(prev, {[item.name]: `${baseAddr}/${item.name}.js`}), {});

        apis.forEach((item) => {
            let
                apiConfigs = item.value;

            if (apiConfigs) {
                let itemResult = _.template(itemTemplate)({
                    apis: apiConfigs,
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

                fse.outputFileSync(apiFiles[item.name], jsBeautify(itemResult, beautifyOps));

                app.$emit("api-gen-generated", apiConfigs);
            }
        });

        app.$emit("apis-generated");
    };

    app.$on("test-api-completed",()=>{
        generate();
    });

}