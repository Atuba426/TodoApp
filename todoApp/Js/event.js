import { store } from "./app.js";
import { createHistoryManager } from "./history.js";
const history = createHistoryManager();
document.getElementById("undo")
  .addEventListener("click", () => {
    console.log("Undo clicked");
    history.undo();
  });

document.getElementById("redo")
  .addEventListener("click", () => {
    console.log("Redo clicked");
    history.redo();
  });
export function initEvents() {
  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit event fired");

    const title = document.getElementById("task-title").value;
    const priority = document.getElementById("task-priority").value;
    const duedate = document.getElementById("task-due").value;

    const newTask = {
      id: Date.now(),
      title,
      priority,
      duedate,
      completed: false,
    };
    store.dispatch({
      type: "ADD_TASKS",
      payload: newTask,
    });

    e.target.reset();
  });
  document.getElementById("filter-status").addEventListener("change", (e) => {
    console.log("filter-status");
    store.dispatch({
      type: "SET_FILTER",
      payload: e.target.value.toLowerCase(),
    });
  });
  //events
  document.getElementById("task-list").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const taskId = Number(li.dataset.id);
    //delete logic

    if (e.target.classList.contains("delete-btn")) {
      console.log("delete clicked!");
      store.dispatch({
        type: "DELETE_TASKS",
        payload: { id: taskId },
      });
      return;
    }
    //toggle logic
console.log("toggle clicked!");
    store.dispatch({
      type: "TOGGLE_TASKS",
      payload: { id: taskId },
    });
  });
}
