import store from "../../store";

const {clipboard, remote} = window.require('electron');
const child_process = remote.require("child_process");
const prefix = "./main/damo";
export default {
    register(){
        child_process.execSync(`python ${prefix}/main.py"`);
    },
}