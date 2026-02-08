import { store } from "./app.js";

export function createHistoryManager() {
  const past = [];
  const future = [];
  let isRestoring = false;

  function saveSnapShot() {
    if (isRestoring) return;
    console.log("Snapshot saved", store.getState().tasks.length);

    past.push(JSON.parse(JSON.stringify(store.getState().tasks)));
    future.length = 0; //once we start writing new task it deletes older tasks like hello->hello world-> hello friends so undo would be hello world not hello becz of this
  }
  function undo() {
    if (past.length === 0) return;
    isRestoring = true;
    const previous = past.pop();
    if (!Array.isArray(previous)) return;
    future.push(JSON.parse(JSON.stringify(store.getState().tasks)));
    store.dispatch({
      type: "SET_TASKS",
      payload: previous,
    });
    isRestoring = false;
  }
  function redo() {
    if (future.length === 0) return;
    isRestoring = true;
    const next = future.pop();
    if (!Array.isArray(future)) return;
    past.push(JSON.parse(JSON.stringify(store.getState().tasks)));
    store.dispatch({
      type: "SET_TASKS",
      payload: next,
    });
    isRestoring = false;
  }
  return { saveSnapShot, undo, redo };
}
