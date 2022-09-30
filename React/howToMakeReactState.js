import React, { useState } from 'react'

/**
 * State는 로컬에 저장해야 한다.
 * State를 로컬에 저장하면 필요하는 것을 새로 생성하거나 변경하는 것이 쉽다.
 * 
 */
const howToMakeReactState = () => {
    const [count, setCount] = useState(0);

    // 안 좋은 예
    // 상태 업데이트, 표시가 두 개의 별개의 구성 요소로 나뉘어 count 상태 논리를 따르는 것이 어렵다.
    // 다른 구성 요소 상태가 많은 경우는 더 복잡하고 어렵게 된다. 특히, 새로운 기능을 생성하거나 기존 기능을 변경할 때도 복잡하다.
    /*
        const [count, setCount] = useState(0);
        const incrementCount = () => setCount(prevCount => prevCount + 1);
        return <Counter count={count} incrementCount={incrementCount} />
    */
    return (
        <div>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <span>{count}번 클릭하였습니다.</span>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(0)}>초기화</button>
        </div>
    )
}

export default howToMakeReactState;