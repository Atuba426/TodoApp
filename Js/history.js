import { state } from "./state.js";
import { renderTasks } from "./ui.js";
import { saveTasks } from "./storage.js";

export function createHistoryManager() {
  function saveSnapshot() {
    state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
    state.history.future = [];
  }

  function undo() {
    if (state.history.past.length === 0) return;
    state.history.future.push(JSON.parse(JSON.stringify(state.tasks)));
    state.tasks = state.history.past.pop();
    saveTasks(state.tasks);
    renderTasks();
  }

  function redo() {
    if (state.history.future.length === 0) return;
    state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
    state.tasks = state.history.future.pop();
    saveTasks(state.tasks);
    renderTasks();
  }
  return {saveSnapshot,undo,redo};
}
