import createStore from "./createStore";

const initialState = {
    count: 0
};

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}

const store = createStore(reducer, initialState);

export default store;