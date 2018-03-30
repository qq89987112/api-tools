// 此乃模板的output变量，保存至此


let notices = JSON.parse(localStorage.notices||'[]').filter(i=>i);

// 具体保存的就是notify的参数。
// notify(path, events, params, options)
//
//
// 只保存20条
export default function (state = notices,action){
    let notice;
    switch(action.type){
        case "NOTICE_ADD":
            state = [action.notice,...state].slice(0,15);
            break;
        default:
            ;
    }
    localStorage.notices = JSON.stringify(state);
    return state;
};