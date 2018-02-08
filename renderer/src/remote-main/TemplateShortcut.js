const {remote} = window.require('electron')
const {globalShortcut} = remote.require('electron');


export default class TemplateShortcut {
    static add(key,func){

    }
    static reLoad(){
        const templateShortcuts = JSON.parse(localStorage.templateShortcuts||'[]');
        templateShortcuts.forEach(item=>{
            globalShortcut.register(item.key,()=>{

            });
        })

    }
}
