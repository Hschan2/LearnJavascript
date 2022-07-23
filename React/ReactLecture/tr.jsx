import React, {useMemo, memo} from 'react';
import Td from './td';

// memo => props만 바뀌지 않으면 Rerendering 하지 않음
// useMemo => memo를 적용했음에도 Rerendering이 될 때, 컴포넌트 자체를 기억해버리게 만들어버리는 최후의 방법
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {/* 반복문(map)안에는 꼭 key 값 설정 */}
            {Array(rowData.length).fill().map((td, i) => (<Td key = {i} dispatch = {dispatch} rowIndex = {rowIndex} cellIndex = {i} cellData = {rowData[i]}>{''}</Td>, [rowData[i]]))}
        </tr>
    );
});

export default Tr;