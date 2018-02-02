let
    fse = require('fs-extra'),
    jsBeautify = require('js-beautify').js;
module.exports = (app)=>{
    app.$on('test-api-completed',()=>{
        fse.outputFileSync('./dist/api/cache.json',jsBeautify(JSON.stringify(app.$env.appResults)));
    })
}