const startRender = require("../renderer/scripts/start");
const process = require('child_process');
startRender().then(url=>{
    process.exec('electron ./main');
});