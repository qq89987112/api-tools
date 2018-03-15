import React from "react"
import { createHashHistory as createHistory } from "history";
import ModalWrapper from "../../components/Base/ModalWrapper";
import JSTemplateGenerator from "../../components/JSTemplateGenerator";
import {Views} from "../../views";
import store from "../index";
import {Provider} from 'react-redux'

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
                        let result = <div>{key} 对应类型暂未实现</div>;
                        let params = item.params;
                        switch(item.type){
                            case "模板跳转":
                                result = <JSTemplateGenerator  onSubmit={result=>{

                                }
                                } template={params}/>;
                                break;
                            case "页面跳转":
                                const Component = Views.find(i=>i.path===params.path);
                                try{
                                    params = JSON.parse(params.params);
                                    result = Component ? <Component.component  {...params}/> :  <div>页面跳转：所指定的path {params.path} 找不到对应的组件</div>;
                                }catch (e){
                                    console.error(e);
                                    result = <div>页面跳转：参数{params.params} JSON.parse 出错</div>
                                }


                                break;
                            default:
                                break;
                        }
                        return <Provider store={store}>
                            {result}
                        </Provider>;
                    },{width:"90%",footer:null})
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