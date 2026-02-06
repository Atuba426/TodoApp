import { state } from "./state.js";
import { saveTasks } from "./storage.js";
import { debounce } from "./debounce.js";

const debouncedSave = debounce(() => {
  saveTasks(state.tasks);
  console.log("Autosaved!");
}, 800);

export function autosave() {
  debouncedSave();
}
