import { state } from "./state.js";
import { autosave } from "./autosave.js";
import { renderTasks } from "./ui.js";
import {createHistoryManager} from "./history.js";
const history= createHistoryManager();

export function initEvents() {
  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const priority = document.getElementById("task-priority").value;
    const dueDate = document.getElementById("task-due").value;
history.saveSnapshot();
    state.tasks = [
      ...state.tasks,
      {
        id: Date.now(),
        title,
        priority,
        dueDate,
        completed: false,
      },
    ];

  autosave();
    renderTasks();
    e.target.reset();
  });
  document.getElementById("filter-status").addEventListener("change", (e) => {
    state.filter = e.target.value;
    renderTasks();
  });

  document.getElementById("task-list").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const taskId = Number(li.dataset.id);
    //delete logic
    history.saveSnapshot();
    if (e.target.classList.contains("delete-btn")) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    autosave();
      renderTasks();
      return;
    }
    //undo-redo btns
    document.getElementById("undo").addEventListener("click",history.undo);
    document.getElementById("redo").addEventListener("click",history.redo);
    //Toggle logic
    const task = state.tasks.find((t) => t.id === taskId);
    if (!task) return;
    history.saveSnapshot();
    state.tasks = state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
  autosave();
    renderTasks();
  });
}
