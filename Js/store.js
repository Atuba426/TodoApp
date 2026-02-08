export function createStore(initialState, reducer) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  }

  function subscribe(fn) {
    listeners.push(fn);
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}
