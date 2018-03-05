import TemplateShortcut from "../../../remote-main/TemplateShortcut";

let templates = JSON.parse(localStorage.templates||'[]');

export default function (state = templates,action){
    let template;
    switch(action.type){
        case "TEMPLATE_ADD":
            template = action.template;
            template.id = +templates[templates.length-1].id +1 || 0;
            state = template ? state.concat(template) : state;
            break;
        case "TEMPLATE_UPDATE":
            template = action.template;
            const index = templates.findIndex(t=>t.id===template.id);
            if (~index) {
                templates[index] = template;
            }
            state = [...templates];
            break;
        default:
            ;
    }

    TemplateShortcut.reLoad();
    localStorage.templates = JSON.stringify(state)
    return state;
};