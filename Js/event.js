import { state } from "./state.js";
import { saveTasks } from "./storage.js";
import { renderTasks } from "./ui.js";

export function initEvents() {
  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const priority = document.getElementById("task-priority").value;
    const dueDate = document.getElementById("task-due").value;

    state.tasks.push({
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false,
    });
    saveTasks(state.tasks);
    renderTasks();
    e.target.reset();
  });
  document.getElementById("filter-status").addEventListener("change", (e) => {
    state.filter = e.target.value;
    renderTasks();
  });

  document.getElementById("task-list").addEventListener("click", (e) => {
    const li = e.target;
    if (!li.dataset.id) return;

    const taskId = Number(li.dataset.id);
    const task = state.tasks.find((t) => t.id === taskId);
    if (!task) return;
    task.completed = !task.completed;
    saveTasks(state.tasks);
    renderTasks();
  });
}
