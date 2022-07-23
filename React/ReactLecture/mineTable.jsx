import React, { useContext, memo } from 'react';
import { TableContext } from './mineSearch';
import Tr from './mineTr';

const mineTable = memo(() => {
    const { tableData } = useContext(TableContext);

    return (
        <table>
            {/* 테이블 개수만큼 반복해서 만들기 */}
            {Array(tableData.length).fill().map((tr, i) => { <Tr rowIndex = {i} /> })}
        </table>
    );
});

export default mineTable;