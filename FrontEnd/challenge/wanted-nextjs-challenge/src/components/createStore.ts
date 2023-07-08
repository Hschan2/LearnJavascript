import { Action } from "../type/ReduxType";

export default function createStore(reducer: (state: any, action: Action) => any, initialState: any) {
  let currentState = initialState;
  const listeners: Function[] = [];

  function getState() {
    return currentState;
  }

  function dispatch(action: Action) {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener: Function) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return {getState, dispatch, subscribe}
}