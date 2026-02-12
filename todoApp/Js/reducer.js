export function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASKS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        
      };
    case "DELETE_TASKS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case "TOGGLE_TASKS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id == action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "SET_FILTERS":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
      default:
      return state;
  }
}
