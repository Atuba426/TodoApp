const STORAGE_KEY = "taskforge_task";

export function saveTasks(tasks) {
  if (!Array.isArray(tasks)) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTask() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data || data === "undefined") {
    return [];
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.log("corrupted local storage data", err);
    return [];
  }
}
