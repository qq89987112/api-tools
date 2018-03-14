import {combineReducers} from "redux"; //combinReducers用于合并各模块的reducers;
import templates from "./templates";
import shortcuts from "./shortcuts";

export default combineReducers({
    templates,
    shortcuts
});