import utils from "../js/utils";
import global from "../js/global";
import keyboard from "../js/keyboard";

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
    }
}