import React from "react"
import { createHashHistory as createHistory } from "history";
import ModalWrapper from "../../components/Base/ModalWrapper";
import JSTemplateGenerator from "../../components/JSTemplateGenerator";

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
                    ModalWrapper.$show(()=>{
                        let result = <div>{key}没有对应匹配的内容</div>;
                        switch(item.type){
                            case "模板跳转":
                                result = <JSTemplateGenerator  onSubmit={result=>{

                                }
                                } template={item.params}/>;
                                break;
                            default:
                                break;
                        }
                        return result;
                    })
                });
            }
        })
    }
}
export default function (state = shortcuts,action){
    let shortcut;
    switch(action.type){
        case "SHORTCUT_ADD":
        case "TEMPLATE_UPDATE":
            shortcut = action.shortcut;
            const index = shortcuts.findIndex(t=>t.key===shortcut.key);
            if (~index) {
                shortcuts[index] = shortcut;
            }else{
                shortcuts = state.concat(shortcut);
            }
            state = [...shortcuts];
            break;
        default:
            ;
    }

    localStorage.shortcuts = JSON.stringify(state)
    Shortcut.reLoad();
    return state;
};