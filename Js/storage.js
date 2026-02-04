const STORAGE_KEY= 'todoApp_task';

export function saveTasks(tasks){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));

}
export function loadTasks(){
const data= localStorage.getItem(STORAGE_KEY);
return data ? JSON.parse(data): [];
}