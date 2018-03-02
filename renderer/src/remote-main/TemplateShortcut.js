import { createHashHistory as createHistory } from "history";
const {remote} = window.require('electron')
const {globalShortcut} = remote.require('electron');

export default class TemplateShortcut {
    static history = createHistory();
    static shortcutListener = ()=>{}
    // url
    // params
    // template
    static add(options){

    }

    static onShortcut(listener){
        TemplateShortcut.shortcutListener = listener;
    }

    static reLoad(){
        const templates = JSON.parse(localStorage.templates||'[]');
        templates.forEach(item=>{
            let shortcut = item.shortcut;
            if(shortcut){
                // let mainWindow = remote.getGlobal("mainWindow");
                // mainWindow.restore();
                globalShortcut.unregister(shortcut);
                globalShortcut.register(shortcut,()=>{
                    TemplateShortcut.history.push("/template-driver/js-template",item);
                    TemplateShortcut.shortcutListener(shortcut,item);
                });
            }
        })
    }
}