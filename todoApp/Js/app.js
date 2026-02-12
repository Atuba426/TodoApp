import { initialState } from "./state.js";
import { createStore } from "./store.js";
import { reducer } from "./reducer.js";
import { autosave } from "./autosave.js";
import { renderTasks } from "./ui.js";
import { initEvents } from "./event.js";
import { createHistoryManager } from "./history.js";

export const store = createStore(initialState, reducer);
const history = createHistoryManager();
//subscribers
store.subscribe(() => {
  renderTasks(store.getState());
});
store.subscribe(() => {
  autosave(store.getState());
});
store.subscribe(() => history.saveSnapShot());
renderTasks(store.getState());

//events
initEvents();

document.getElementById("undo").addEventListener("click", history.undo);
document.getElementById("redo").addEventListener("click", history.redo);
