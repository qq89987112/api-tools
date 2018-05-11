import keyboard from "../js/keyboard";
import utils from "../js/utils";
const {clipboard, remote} = window.require('electron');
const path = remote.require("path");
const glob = remote.require("glob").sync;

export default {
    validate:/^\$templates$/,
    handle(result){
        let
            [name,params] = utils.parseLineToObject(result[0]),
            modifier = params.modifier,
            fileAddr;

        if (modifier) {
            fileAddr = path.join(remote.getGlobal("__dirname"), `../plugins/template/single-file/**/${modifier}/**.js`);
        } else {
            fileAddr = path.join(remote.getGlobal("__dirname"), "../plugins/template/single-file/**/**.js");
        }
        let templates = glob(fileAddr);
        keyboard.output("\r\n目前的模板列表如下：\r\n" + templates.map((item, index) => `${index + 1}：${item}`).join('\r\n') + "\r\n");
    }
}