let
    apis = require("../src/example"),
    codeGen = require("../src/index"),
    fse = require("fs-extra");


    fse.removeSync("./dist");
    codeGen(apis);

