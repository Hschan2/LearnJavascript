import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './mineSearch';

// TD 스타일 설정
const getTdStyle = (code) => {
    switch (code) {
        // 칸에 -1 혹은 -7의 값이 있다면
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        // 칸에 값이 0이라면
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: '#fff',
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red',
            };
        default:
            return {
                background: '#fff',
            };
    }
};

// TD Value 설정
const getTdText = (code) => {
    switch (code) {
        // 칸에 -1 혹은 -7의 값이 있다면
        case CODE.NORMAL: // 값을 빈 값으로
            return '';
        case CODE.MINE: // 값을 X로 표시
            return 'X';
        case CODE.CLICKED_MINE:
            return '팡!';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default: // 기본적으로 빈 값으로
            return code || ''; // 주변 지뢰 개수 표시, 0이면 빈 공간
    }
};

const mineTd = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);
    const onClickTd = useCallback(() => {
        if(halted) {
            return;
        }

        switch (tableData[rowIndex][cellIndex]) {
            // 클릭해도 아무 반응없어야 할 때
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            // 클릭했을 때, 칸이 열려야 할 때
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            // 클릭했을 때, 지뢰였을 때
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    // 오른쪽 마우스 클릭 시,
    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); // 오른쪽 클릭 시 메뉴 뜨지 않도록

        if(halted) {
            return;
        }
        
        switch(tableData[rowIndex][cellIndex]) {
            // 보통칸일 때, 깃발칸으로
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            // 깃발칸일 때, 물음표칸으로
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            // 물음표칸일 때, 보통칸으로
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    // 리렌더링 한 번만 이루어짐
    return useMemo(() => (
        <td style = {getTdStyle(tableData[rowIndex][cellIndex])} onClick = {onClickTd} onContextMenu = {onRightClickTd}>
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    ), [tableData[rowIndex][cellIndex]]);

    // return <RealId onClickTd = {onClickTd} onRightClickTd = {onRightClickTd} data = {tableData[rowIndex][cellIndex]} />
});

// 컴포넌트 분리하기
// const RealId = memo(({ onClickTd, onRightClickTd, data}) => {
//     return (
//         <td style = {getTdStyle(data)} onClick = {onClickTd} onContextMenu = {onRightClickTd}>
//             {getTdText(data)}
//         </td>
//     );
// });

export default mineTd;