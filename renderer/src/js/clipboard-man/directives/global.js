import keyboard from "../js/keyboard";
import store from "../../../store";
import utils from "../js/utils";
import global from "../js/global";

export default {
    validate:/^\$global.+/,
    handle(result){
        let [name,params={}] = utils.parseLineToObject(result[0]);
        if (params.modifier === 'set') {
            let {rest,modifier,...paramsClone} = params;
            Object.entries(paramsClone).forEach(i=>global[i[0]]=i[1]);
            keyboard.output("设置成功!");
        }else{

        }
    }
}