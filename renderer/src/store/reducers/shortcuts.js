import React from "react"
import { createHashHistory as createHistory } from "history";
import ModalWrapper from "../../components/Base/ModalWrapper";
import JSTemplateGenerator from "../../components/JSTemplateGenerator";
import {Views} from "../../views";
import store from "../index";
import {Provider} from 'react-redux'
import {JSFile} from "../../views/ProjectTemplate";

const { clipboard } = window.require('electron');
const {remote} = window.require('electron')
const {globalShortcut} = remote.require('electron');


export const types = [
    // {
    //   name:'函数回调',
    //
    // },
    {
        name:'模板跳转',
        params:[{
            name:'模板',
            filed:'template',
            type:"template"
        }],
        render:(shortuct)=>{
            let params = shortuct.params;
            return <JSTemplateGenerator  onSubmit={result=>{
                clipboard.writeText(result);
                this.toast("已复制到剪贴板。");
            }
            } template={params}/>;
        }
    },
    {
        name:'页面跳转',
        params:[{
            name:'地址',
            filed:"path",
            type:"route"
        },{
            name:'参数',
            filed:'params',
            type:Object
        }],
        render:(shortuct)=>{
            let result;
            let params = shortuct.params;
            const Component = Views.find(i=>i.path===params.path);
            try{
                params = JSON.parse(params.params);
                result = Component ? <Component.component  {...params}/> :  <div>页面跳转：所指定的path {params.path} 找不到对应的组件</div>;
            }catch (e){
                console.error(e);
                result = <div>页面跳转：参数{params.params} JSON.parse 出错</div>
            }
            return result;
        }
    },

];

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

    static reLoad(shortcuts = JSON.parse(localStorage.shortcuts||'[]')){
        globalShortcut.register("F12",this.onF12Shortcut);
        shortcuts.forEach(item=>{
            let key = item.key;
            if(key){
                // let mainWindow = remote.getGlobal("mainWindow");
                // mainWindow.restore();
                globalShortcut.unregister(key);
                globalShortcut.register(key,()=>{
                    if (item.type === "函数回调") {
                        let cb = item.cb;
                        cb&&cb();
                    }else{
                        ModalWrapper.$show(()=>{
                            let type = types.find(i=>i.name===item.type);
                            let result = type&&type.render(item)|| <div>{key} 对应类型暂未实现</div>;
                            return <Provider store={store}>
                                {result}
                            </Provider>;
                        },{width:"90%",footer:null})
                    }

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
let tempShortcuts = JSON.parse(localStorage.shortcuts||'[]');
export default function (state = tempShortcuts,action){
    let shortcut;
    switch(action.type){
        case "PROJECT_UPDATE":
            const {projects} = store.getState();
            let project = action.project;
            const tempProject = projects[project.path];
            if (tempProject) {
                if (project.activePath/*&&(tempProject.activePath !== project.activePath)*/) {
                    let pathShortcuts = project.pathShortcuts;
                    let activeGroup = tempProject.activeGroup||'default';
                    const groupShortcuts = pathShortcuts[project.activePath];
                    const shortcuts = groupShortcuts[activeGroup];
                    state = Object.entries(shortcuts).map(item=>{
                        return {
                            type:'函数回调',
                            key:item[0],
                            cb:()=>{
                                (new JSFile(item[1])).compile();
                            }
                        }
                    }) || [];
                    Shortcut.reLoad(state);
                }
            }
            break;
        case "SHORTCUT_RELOAD":
            state = JSON.parse(localStorage.shortcuts||'[]');
            break;
        case "SHORTCUT_ADD":
        case "SHORTCUT_UPDATE":
            state = tempShortcuts || state;
            shortcut = action.shortcut;
            const index = state.findIndex(t=>t.key===shortcut.key);
            if (~index) {
                state[index] = shortcut;
            }else{
                state = state.concat(shortcut);
            }
            tempShortcuts = state = [...state];
            localStorage.shortcuts = JSON.stringify(state);
            Shortcut.reLoad();
            break;
        default:
            ;
    }
    return state;
};