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
            localStorage.projects = JSON.stringify(state)
            break;
        // 可以更新shortcut group
        case "PROJECT_UPDATE":
        case "PROJECT_ADD":
            project = action.project;
            project.activeGroup = project.activeGroup||'default';
            let tempProject = state[project.path];
            tempProject = tempProject || {};
            state[project.path] = {...tempProject,...project};
            state = {...state};
            localStorage.projects = JSON.stringify(state)
            break;
        default:
            ;
    }
    return state;
};