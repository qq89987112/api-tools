const load  = require( "./load");
const test  = require( "./test");
const fs = require("fs");
const path = require("path");

let script = load(test);
script.start();
// script.instance.$browser.openUrl("http://wwwqqq899871122wscrgWO0.501wan.com/start/2217.html");

let testAddr = path.join(__dirname,"./test.js");
fs.watch(testAddr,()=>{
    delete require.cache[testAddr];
    try {
        script = load(require( "./test"));
        script.start();
    }catch (e){}

})