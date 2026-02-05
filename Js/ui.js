import { state } from "./state.js";

export function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  const filtered = state.tasks.filter((task) => {
    if (state.filter === "completed") return task.completed;
    if (state.filter === "Active") return !task.completed;
    return true;
  });
  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${task.title}</span> 
        <button class="delete-btn">❌</button>
        `;
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    }
    list.appendChild(li);
  });
}
