let
    fse = require("fs-extra"),
    path = require('path'),
    lodash = require('lodash'),
    mainTemplate = fse.readFileSync(path.join(__dirname,"./main"));

module.exports  = (app)=>{
    fse.outputFileSync("./dist/koa/main.js",lodash.template(mainTemplate)());
}