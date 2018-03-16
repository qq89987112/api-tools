import {Shortcut} from "./shortcuts";
import store from "../index"

/**
 * [
 *    {
 *       projectPath:''
 *       activePath:'',
 *       expandedKeys:[]
 *     }
 * ]
 * @param state
 * @param action
 * @returns {any}
 */
export default function (state = JSON.parse(localStorage.projects||'[]'),action){
    let project;
    switch(action.type){
        // 可以更新shortcut group
        case "PROJECT_UPDATE":
        case "PROJECT_ADD":
            project = action.project;
            const index = state.findIndex(t=>t.projectPath===project.path);
            if (~index) {
                let existProject = state[index];
                if (existProject.activePath !== project.activePath) {
                    store.dispatch({
                        type:'SHORTCUT_RESET',
                        1
                    });
                }
                state[index] = project;
            }else{
                state = state.concat(project);
            }
            state = [...state];
            break;
        default:
            ;
    }

    localStorage.projects = JSON.stringify(state)
    return state;
};