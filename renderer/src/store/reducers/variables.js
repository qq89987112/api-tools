// clipboardMan的全局变量


//
let variables = JSON.parse(localStorage.variables||'[]').filter(i=>i);


export default function (state = variables,action){
    switch(action.type){
        case "VARIABLE_ADD":
            state = [...state,action.variable];
            break;
        default:
            ;
    }
    localStorage.variables = JSON.stringify(state);
    return state;
};