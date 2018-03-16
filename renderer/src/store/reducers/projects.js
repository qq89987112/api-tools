import {Shortcut} from "./shortcuts";
import store from "../index"
import {JSFile} from "../../views/ProjectTemplate";

/**
 * {
 *    // 项目地址
 *    path:{
 *       path:''
 *       activePath:'',
 *       activeGroup:'',
 *       expandedKeys:[],
 *       pathShortcuts:{
 *          group:{
 *              F1:jsfile
 *          }
 *       }
 *     }
 * }
 * @param state
 * @param action
 * @returns {any}
 */
export default function (state = JSON.parse(localStorage.projects || '{}'), action) {
    let project;
    switch (action.type) {
        case "PROJECTS_UPDATE":
        case "PROJECTS_SET":
            state = action.projects || {};
            break;
        // 可以更新shortcut group
        case "PROJECT_UPDATE":
        case "PROJECT_ADD":
            project = action.project;
            let tempProject = state[project.path];
            if (tempProject) {
                if (project.activePath&&(tempProject.activePath !== project.activePath)) {
                    let pathShortcuts = project.pathShortcuts;
                    let activeGroup = tempProject.activeGroup||'default';
                    tempProject.activeGroup = activeGroup;
                    const groupShortcuts = pathShortcuts[project.activePath];
                    const shortcuts = groupShortcuts[activeGroup];
                    store.dispatch({
                        type: 'SHORTCUT_ONCE_RESET',
                        shortcuts:Object.entries(shortcuts).map(item=>{
                            return {
                                type:'函数回调',
                                key:item[0],
                                cb:()=>{
                                    (new JSFile(item[1])).compile();
                                }
                            }
                        })
                    });
                }
            }
            tempProject = tempProject || {};
            state[project.path] = {...tempProject,...project};
            state = {...state};
            break;
        default:
            ;
    }
    localStorage.projects = JSON.stringify(state)
    return state;
};