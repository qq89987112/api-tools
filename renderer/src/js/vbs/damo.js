import store from "../../store";

const {clipboard, remote} = window.require('electron');
const child_process = remote.require("child_process");

export default {
    sendKeys(keys){
        child_process.execSync(`wscript ./main/sendKeys.vbs "${keys}"`);
    },
}