import React, { useState, useCallback, useContext, memo } from 'react';
import { START_GAME, TableContext } from './mineSearch';

const mineForm = memo(() => {
    const [row, setRow] = useState(10); // 행 초기화
    const [cell, setCell] = useState(10); // 열 초기화
    const [mine, setMine] = useState(20); // 지뢰 개수 초기화
    const { dispatch } = useContext(TableContext)

    // 불필요한 렌더링을 방지하기 위해 useCallback
    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, []);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    // Context API 사용
    const onClickBtn = useCallback((e) => {
        dispatch({ type: START_GAME, row, cell, mine });
    }, [row, cell, mine]);

    return (
        <div>
            <input type = "number" placeholder = "행 개수 설정" value = {row} onChange = {onChangeRow} />
            <input type = "number" placeholder = "열 개수 설정" value = {cell} onChange = {onChangeCell} />
            <input type = "number" placeholder = "지뢰 개수 설정" value = {mine} onChange = {onChangeMine} />
            <button onClick = {onClickBtn}>Start</button>
        </div>
    );
});

export default mineForm;