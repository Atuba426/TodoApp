import { store } from "./app.js";
import { saveTasks } from "./storage.js";
import { debounce } from "./debounce.js";

const debouncedSave = debounce(() => {
  const state=store.getState();
  saveTasks(state.tasks);
  console.log("Autosaved!");
}, 800);

export function autosave() {
  debouncedSave();
}
