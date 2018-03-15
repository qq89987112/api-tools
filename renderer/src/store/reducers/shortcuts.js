import React from "react"
import { createHashHistory as createHistory } from "history";
import ModalWrapper from "../../components/Base/ModalWrapper";
import JSTemplateGenerator from "../../components/JSTemplateGenerator";
import {Views} from "../../views";
import store from "../index";
import {Provider} from 'react-redux'


const {remote} = window.require('electron')
const {globalShortcut} = remote.require('electron');

export class Shortcut {
    static history = createHistory();
    static shortcutF12Listener = ()=>{}
    // url
    // params
    // template
    static add(options){

    }

    static onF12Shortcut(listener){
        Shortcut.shortcutF12Listener = listener;
    }

    static reLoad(){
        const shortcuts = JSON.parse(localStorage.shortcuts||'[]');
        globalShortcut.register("F12",this.onF12Shortcut);
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

/**
 *
 * @param state
 *  [
 *      {
 *          key,
 *          type,
 *          params
 *      }
 *  ]
 * @param action
 * @returns {any}
 */
export default function (state = JSON.parse(localStorage.shortcuts||'[]'),action){
    let shortcut;
    switch(action.type){
        // 当快捷键组改变时,使用这个action
        case "SHORTCUT_RESET":
            state = action.shortcuts;
            break;
        case "SHORTCUT_ADD":
        case "SHORTCUT_UPDATE":
            shortcut = action.shortcut;
            const index = state.findIndex(t=>t.key===shortcut.key);
            if (~index) {
                state[index] = shortcut;
            }else{
                state = state.concat(shortcut);
            }
            state = [...state];
            break;
        default:
            ;
    }

    localStorage.shortcuts = JSON.stringify(state)
    Shortcut.reLoad();
    return state;
};