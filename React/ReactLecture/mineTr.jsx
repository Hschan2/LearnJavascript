import React, { useContext, memo } from 'react';
import { TableContext } from './mineSearch';
import Td from './mineTd';

const mineTr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <tr>
            {/* undefined가 나올 상황 대비 */}
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) => { <Td rowIndex = {rowIndex} cellIndex = {i} /> })}
            <Td />
        </tr>
    );
});

export default mineTr;