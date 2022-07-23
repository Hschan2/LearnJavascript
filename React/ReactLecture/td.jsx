import React, {useCallback, useEffect, useRef, memo} from 'react';
import { CLICK_CELL } from './TicTacToc';

// memo => props만 바뀌지 않으면 Rerendering 하지 않음
const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    // 한 번 클릭 시 모든 셀이 렌더링하는 문제 확인
    // const ref = useRef([]);
    // useEffect(() => {
    // console.log(rowIndex === ref.current[0], rowIndex === ref.current[1], rowIndex === ref.current[2], rowIndex === ref.current[3])
    // console.log(cellData, ref.current[3]); => 문제가 있는 cellData 확인
    // ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // }, [rowIndex, cellIndex, dispatch, cellData]); // 모든 props 확인하기

    const onClickTd = useCallback(() => {
        if(cellData) return;

        // type명은 아무렇게나 지어도 된다.
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData])

    return (
        <td onClick = {onClickTd}>{cellData}</td>
    )
});

export default Td;