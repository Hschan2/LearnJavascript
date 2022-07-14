
//action(어떤 변화가 일어나는지, 작업의 정보) 작성
const START = "START";
const RESTART = "GAMESTART";
const P1NUMBER = "P1NUMBER";
const P2NUMBER = "P2NUMBER";


function Start() {
    return {
        type: START
    };
}

function Restart() {
    return {
        type: RESTART
    };
}

function P1number() {
    return {
        type: P1NUMBER
    };
}

function P2number() {
    return {
        type: P2NUMBER
    };
}



// reducer(action이 일어났을 때 어떻게 상태를 바꿀지) 생성
const initialState = {
    isPlaying: false,
    isRePlaying: false,
    isP1number:[],
    isP2number:[],
};

const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case START:
            return applyStart(state);
        case RESTART:
            return applyReStart(state);
        case P1NUMBER:
            return applyP1Number(state, action.number);
        case P2NUMBER:
            return applyP2Number(state, action.number);
        default:
            return state;
    }
}


function applyStart(state) {
    return {
        ...state,
        isPlaying: true
    }
}

function applyReStart(state) {
    return {
        ...state,
        isRePlaying: true,
        isturn: 'user1'
    }
}


function applyP1Number(state, number) {
    return {
        ...state,
        isP1number: number
    }
}

function applyP2Number(state, number) {
    return {
        ...state,
        isP2number: number
    }
}


export const actions = {
    Start,
    Restart,
    P1number,
    P2number
}
export default counterReducer;