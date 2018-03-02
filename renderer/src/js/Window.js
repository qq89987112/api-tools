const { remote } = window.require('electron');
const {BrowserWindow} = remote.require("electron");

export default class Window{
    /**
     *
     * @param url 以/开头
     * @param params
     */
    static open(url,params){
        new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            transparent: true,
            webPreferences: {webSecurity: false},
            alwaysOnTop:true
        }).loadURL(`${remote.getGlobal("baseURL")}/#${url}`);
    }
}