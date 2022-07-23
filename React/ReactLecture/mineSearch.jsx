import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './mineForm';
import Table from './mineTable';

// 배열에 들어갈 지뢰 유무 확인
export const CODE = {
    MINE: -7, // 지뢰일 경우, -7
    NORMAL: -1, // 지뢰가 아닐 경우, -1
    QUESTION: -2, // 마우스 오른쪽 클릭 시, 물음표
    FLAG: -3, // 마우스 오른쪽 클릭 시, 깃발
    QUESTION_MINE: -4, // 마우스 오른쪽 클릭 시, 지뢰가 있는 물음표
    FLAG_MINE: -5, // 마우스 오른쪽 클릭 시, 지뢰가 있는 깃발
    CLICKED_MINE: -6, // 마우스 오른쪽 클릭 시, 지뢰가 있는데 클릭
    OPENED: 0, // 정상적으로 열린 칸 (0 이상이면 OPENED)
}

// Context API 사용하기 => 바로 부모의 값을 전달받을 수 있다.
// export 이유. 자식 컴포넌트에서 useContext하여 값을 전달받을 수 있도록
export const TableContext = createContext({
    // 초기값 정의
    tableData: [],
    dispatch: () => {},
    halted: true,
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true, // 게임 중단
    openedCount: 0,
};

// 지뢰 칸과 지뢰 생성
const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    // 지뢰 개수만큼 랜덤으로 뽑기
    const shuffle = [];

    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    // 테이블 생성
    const data = [];

    for(let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL); // CODE.NORMAL => 지뢰가 아닌 테이블
        }
    }

    // 테이블에 지뢰 넣기
    for(let k = 0; k < shuffle.length; k++) {
        // 행과 열 가져오기
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE; // 지뢰 넣기
    }

    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREAMENT_TIMER = 'INCREAMENT_TIMER';

// Context API 사용하기 전, Reducer 복습
const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
            };
        case OPEN_CELL: { // 불변성 유지
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            // tableData[action.row][action.cell] = CODE.OPENED; // 클릭한 셀 열기

            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]]; // 모든 칸을 새로운 객체로
            });

            const checked = [];
            let openCount = 0;

            const checkAround = (row, cell) => { // 현재 칸 기준으로 검사
                // 닫힌 칸만 열기
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }
                // 상하좌우 칸이 아닌 경우 필터링, 상하좌우 없는 칸은 안 열기
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                }
                // 이미 열려 있는 칸인지 확인
                if(checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }

                // 칸 클릭시, 주변 공간 열림
                let around = [
                    tableData[row - 1][cell - 1], tableData[row - 1][cell + 1],
                ];
                if(tableData[row - 1]) { // 클릭한 칸 위에 3칸
                    around = around.concat(
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1],
                    );
                }
                around = around.concat( // 클릭한 칸 양 옆
                    tableData[row][cell - 1],
                    tableData[row][cell + 1],
                );
                if(tableData[row + 1]) { // 클릭한 칸의 아래 3칸
                    around = around.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1],
                    );
                }
                // 클릭한 칸 주위의 지뢰 개수
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;

                if(count === 0) {
                    if(row > -1) {
                        const near = [];
                        if(row - 1 > -1) { // 가장 맨 윗칸 클릭 시
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if(row + 1 > tableData.length) { // 가장 맨 아래칸 클릭 시
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }

                        near.forEach((n) => { // 주변에 칸이 있는 것들만
                            if(tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        });
                    }
                }
                // 닫힌 칸일 때, 카운트 증가
                if(tableData[row][cell] === CODE.NORMAL) openCount += 1;
                tableData[row][cell] = count;
            };

            checkAround(action.row, action.cell);
            // 승리했을 때
            let halted = false;
            let result = '';

            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openCount) {
                halted = true;
                result = `${state.timer}초만에 Win!`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openCount,
                halted,
                result,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;

            return {
                ...state,
                tableData,
                halted: true // 게임 잠시 중단
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            
            if(tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            
            return {
                ...state,
                tableData,
            }
        }
        case INCREAMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
};

const mineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { tableData, halted, timer, result } = state;

    // dispatch는 항상 같은 값이기 때문에
    const value = useMemo(() => ({ tableData: tableData, dispatch, halted: halted }), [tableData, halted]);

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: INCREAMENT_TIMER });
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        // Context API의 Provider 사용, 자식 컴포넌트에 전달할 값 정의
        // 그러나 value = {{tableData: state.tableData, dispatch} 이렇게 사용하면 새로운 값이 생길 때마다 Rerendering => useMemo로
        <TableContext.Provider value = {value}>
            <Form /> {/* 행과 열 개수, 지뢰 개수 설정, dispatch 설정 */}
            <div>{timer}</div> {/* 게임 시간 */}
            <Table /> {/* 지뢰 게임 판 */}
            <div>{result}</div> {/* 결과 */}
        </TableContext.Provider>
    );
};

export default mineSearch;