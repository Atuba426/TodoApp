import {loadTask} from "./storage.js"
export const initialState= {
    tasks:loadTask(),
    filter:"all",
};
