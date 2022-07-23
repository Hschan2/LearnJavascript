import React, {useState, useReducer, useEffect, memo} from 'react';
import Table from './table';

// 변수 값 초기화
// state 직접 수정 불가
const initialState = {
    winner: '',
    turn: '0',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1], // 초기화
}

// action의 이름은 대문자로
// export로 해서 모듈로 만들기
// 자식노드에서 사용할 것이기 때문에
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

// 초기화된 변수 값을 어떻게 바꿀 것인가
// action 처리
const reducer = (state, action) => {
    switch(action.type) {
        case SET_WINNER:
            // state.winner = action.winner처럼 값을 직접 변경하면 안된다.
            return {
                ...state, // state 값 복사 (새로운 state)
                winner: action.winner
            }
        case CLICK_CELL: { // 불변성 만들기
            // 얕은 복사하기 (기존의 변수와 같지 않고 다르게 만들어서 불변성 유지)
            // 아래의 tableData와 맨 위의 기존에 사용한 tableData는 같지 않다. 복사해서 사용한다.
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer 라이브러리로 해결 가능
            tableData[action.row][action.cell] = state.turn; // 클릭했을 때, 해당 칸에 o, x 들어간다
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: '0',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1],
            }
        }
        default:
            return state;
    }
}

const TicTacToc = memo(() => {
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // 3 X 3 Table 만들기, 2차원 배열
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    // 위의 useState, 총 6개를 Table -> Tr -> Td에 전달하여야 한다. 2번을 거쳐서 Td에 전달해야 하는 번거러운 상황이 발생 => useReducer 사용
    // useReducer => 하나의 State와 setState로 전달 가능

    const [state, dispatch] = useReducer(reducer, initialState)
    // state 구조 분해
    const {tableData, turn, winner, recentCell} = state;

    const onClickTable = useCallback(() => {
        // dispatch 안에 액션 객체 생성, 값 변경
        // 값을 직접 바꿔주는 역할로 reducer를 이용
        dispatch({ type: SET_WINNER, winner = '0' });
    }, []);

    // 비동기 처리위해 useEffect() 사용
    // 테이블 셀 클릭할 때마다 검사
    // 승자 판단
    useEffect(() => {
        let win = false;
        const [row, cell] = recentCell;
        
        if(row < 0) return; // recentCell = [-1, -1] 일 때

        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로 검사
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로 검사
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선 검사
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선 검사
            win = true;
        }

        if(win) { // 승리
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({type: RESET_GAME});
        } else {
            // 무승부 검사
            let all = true; // 모든 칸이 채워졌을 경우. 즉, 무승부
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if(!cell) { // 비어있는 칸이 있을 경우. 즉, 무승부가 아니면
                        all = false;
                    }
                });
            });
            
            if(all) { // 무승부일 경우
                dispatch({type: RESET_GAME});
            } else { // 무승부가 아닐 경우
                dispatch({ type: CHANGE_TURN }); // 칸을 클릭 후 턴 변경, td.jsx에 위치했을 때, CLICK_CELL을 하고 나서 실행이 되서 바로 상대편으로 넘어가는 문제 발생
            }
        }

    }, [recentCell])

    return (
        // 클릭하면 dispatch 실행
        // tableData = {state.tableData} = 3 X 3 테이블 만들기
        <>
            <Table onClick = {onClickTable} tableData = {tableData} dispatch = {dispatch}></Table>
            {winner && <div>{winner}의 승리</div>}
        </>
    )
});

export default TicTacToc;