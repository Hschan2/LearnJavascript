import React, {memo} from 'react';
import Tr from './tr';

// TicTacToc에서 받아온 onClick (onClickTable) 가져오기
const Table = memo(({ onClick, tableData, dispatch }) => {
    return (
        <table>
            {/* 반복문(map)안에는 꼭 key 값 설정 */}
            {Array(tableData.length).fill().map((tr, i) => (<Tr key = {i} dispatch = {dispatch} rowIndex = {i} rowData = {tableData[i]} />))}
        </table>
    )
});

export default Table;