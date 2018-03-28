import {combineReducers} from "redux"; //combinReducers用于合并各模块的reducers;
import templates from "./templates";
import shortcuts from "./shortcuts";
import projects from "./projects";
import notices from "./notices";
import variables from "./variables";

export default combineReducers({
    templates,
    shortcuts,
    projects,
    notices,
    variables
});