const {globalShortcut,BrowserWindow} = require('electron')

module.exports = {
    add(key,template,defaults){
        globalShortcut.unregister(key);
        globalShortcut.register(key,()=>{
            global.JSTEmplateParams = {
                template,
                defaults
            };
            let jsTemplateWindow = new BrowserWindow({
                width: 800,
                height: 600,
                // frame: false,
                webPreferences: {webSecurity: false}
            });
            jsTemplateWindow.loadURL(`${global.baseURL}/#/template-driver/js-template`);
            if(global.NODE_ENV === `development`){
                //打开控制台
                jsTemplateWindow.webContents.openDevTools();
            }
        });
    }
}