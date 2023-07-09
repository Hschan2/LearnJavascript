import { Dispatch, Store } from "redux";
import { Action } from "../type/ReduxType";

export default function createStore(reducer: (state: any, action: Action) => any, initialState: any): Store<any, Action> {
  let currentState = initialState;
  const listeners: (() => void)[] = [];

  function getState() {
    return currentState;
  }

  function dispatch(action: Action): undefined {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener: () => void): () => void {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return { getState, dispatch, subscribe };
}