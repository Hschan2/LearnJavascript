import { useState, useEffect } from 'react'

// 요청의 수를 제한하기 위해 useDebounce를 사용한다.
const UseDebounce = (val, delay) => {
    const [debounceVal, setDebounceVal] = useState(val);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(val);
        }, delay); // 전송하기 위한 요청한 키워드 사이에 요청 시간의 양

        return () => {
            clearTimeout(handler);
        };
    }, [val]);

    return debounceVal;
};

export default UseDebounce