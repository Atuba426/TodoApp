import {state} from "./state.js";
import {loadTasks} from "./storage.js";
import {renderTasks} from "./ui.js";
import {initEvents} from "./event.js";
import { createHistoryManager } from "./history.js";

state.tasks= loadTasks();
renderTasks();
initEvents();
createHistoryManager();