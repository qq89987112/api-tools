import store from "../../store";

const {clipboard, remote} = window.require('electron');
const child_process = remote.require("child_process");

export default {
    sendKeys(keys){
        child_process.execSync(`wscript ./main/sendKeys.vbs "${keys}"`);
    },
    output(message){
        clipboard.writeText(message);
        child_process.execSync("wscript ./main/paste.vbs");
    },
    options(tooltip,list){
        this.output(`\r\n${tooltip}：\r\n${list.map((item,index)=>`${index+1}:${item}`).join('\r\n')}\r\n`);
        return new Promise((resolve, reject) => {
            let shortcuts = Array(list.length).fill("*").map((item, index) => ({
                key: index + 1 + "",
                type: '函数回调',
                cb:()=> {
                    store.dispatch({
                        type: "SHORTCUT_RELOAD",
                        shortcuts
                    })
                    resolve([index]);
                    this.sendKeys("^{z}")
                }
            }));

            store.dispatch({
                type: "SHORTCUT_TEMPORARY",
                shortcuts
            })
        })
    }
}