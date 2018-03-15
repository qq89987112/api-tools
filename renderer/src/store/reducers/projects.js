import {Shortcut} from "./shortcuts";

/**
 * [
 *  {
 *      shortcuts:{
 *          path:{
 *              activeGroup:""
 *          }
 *      }
 *  }
 * ]
 * @param state
 * @param action
 * @returns {any}
 */
export default function (state = JSON.parse(localStorage.projects||'[]'),action){
    let template;
    switch(action.type){
        // 可以更新shortcut group
        case "PROJECT_UPDATE":
            break;
        case "PROJECT_ADD":
            break;
        default:
            ;
    }

    localStorage.projects = JSON.stringify(state)
    return state;
};