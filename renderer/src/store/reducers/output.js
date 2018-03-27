// 此乃模板的output变量，保存至此
let outputs = JSON.parse(localStorage.outputs||'[]');

// 只保存20条
export default function (state = outputs,action){
    let template;
    switch(action.type){
        case "OUTPUT_ADD":
            break;
        case "TEMPLATE_UPDATE":
            break;
        default:
            ;
    }
    localStorage.outputs = JSON.stringify(state)
    return state;
};