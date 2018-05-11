import utils from "../js/utils";
import global from "../js/global";
import keyboard from "../js/keyboard";
const {clipboard, remote} = window.require('electron');
const fse = remote.require("fs-extra");
const path = remote.require("path");

export default {
    validate:/^\$api\?(.+)/,
    handle(result){
        let [name,params={}] = utils.parseLineToObject(result[0]);
        let {url,file} = params;
        if(!global.notifyApiFolder){
            keyboard.options("您还未设置global.notifyApiFolder,是否设置?",['是','否']).then(selects=>{
                let select = selects[0];
                if(select===0){
                    keyboard.output("$global.set?notifyApiFolder=");
                }
            })
        }
    //    如果文件存在,则追加
        let fileAddr = path.join(global.notifyApiFolder,`${file}.js`);


        let exists = fse.existsSync(fileAddr);
        let funcName = url.split("/")[-1];


        if (exists) {

        }else{
            fse.outputFileSync(fileAddr,`
import axios from "axios"

export default {
    ${funcName}(params){
        return axios.post('${url}',params);
    },
}`);
        }
    }
}