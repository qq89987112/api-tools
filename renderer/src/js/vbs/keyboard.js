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
    /**
     *   keyboard.options(`文件路径已经存在文件:${fileAddr},是否继续？`,["是","否"]).then((selects)=>{
     *        let select = selects[0];
     *    });
     * @param tooltip
     * @param list
     * @return {Promise<any>}
     */
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
                    // 为了 撤回一下 方便清屏输出新内容
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