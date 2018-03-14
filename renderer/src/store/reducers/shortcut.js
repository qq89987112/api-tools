import { createHashHistory as createHistory } from "history";

let shortcuts = JSON.parse(localStorage.shortcuts||'[]');
const {remote} = window.require('electron')
const {globalShortcut} = remote.require('electron');

export class Shortcut {
    static history = createHistory();
    static shortcutListener = ()=>{}
    // url
    // params
    // template
    static add(options){

    }

    static onShortcut(listener){
        Shortcut.shortcutListener = listener;
    }

    static reLoad(){
        const shortcuts = JSON.parse(localStorage.shortcuts||'[]');
        shortcuts.forEach(item=>{
            let key = item.key;
            if(key){
                // let mainWindow = remote.getGlobal("mainWindow");
                // mainWindow.restore();
                globalShortcut.unregister(key);
                globalShortcut.register(key,()=>{
                    Shortcut.history.push("/template-driver/js-template",item);
                    Shortcut.shortcutListener(key,item);
                });
            }
        })
    }
}
export default function (state = shortcuts,action){
    let shortcut;
    switch(action.type){
        case "SHORTCUT_ADD":
            shortcut = action.shortcut;
            state = shortcut ? state.concat(shortcut) : state;
            break;
        case "TEMPLATE_UPDATE":
            shortcut = action.shortcut;
            const index = shortcuts.findIndex(t=>t.key===shortcut.key);
            if (~index) {
                shortcuts[index] = shortcut;
            }
            state = [...shortcuts];
            break;
        default:
            ;
    }

    localStorage.templates = JSON.stringify(state)
    Shortcut.reLoad();
    return state;
};