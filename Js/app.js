import {state} from "./state.js";
import {loadTasks} from "./storage.js";
import {renderTasks} from "./ui.js";
import {initEvents} from "./event.js";

state.tasks= loadTasks();
renderTasks();
initEvents();