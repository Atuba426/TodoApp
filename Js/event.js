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
      type: "ADD_TASK",
      payload: newTask,
    });

    e.target.reset();
  });
  document.getElementById("filter-status").addEventListener("change", (e) => {
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
      store.dispatch({
        type: "DELETE_TASK",
        payload: { id: taskId },
      });
      return;
    }
    //toggle logic

    store.dispatch({
      type: "TOGGLE_TASK",
      payload: { id: taskId },
    });
  });
}
