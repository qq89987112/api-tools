import {combineReducers} from "redux"; //combinReducers用于合并各模块的reducers;
import templates from "./templates";
import shortcuts from "./shortcuts";
import projects from "./projects";

export default combineReducers({
    templates,
    shortcuts,
    projects
});