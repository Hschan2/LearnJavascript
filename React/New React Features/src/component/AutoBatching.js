import React, { useState } from 'react'
import { flushSync } from 'react-dom';


// Batching: 여러 개의 State 업데이트를 하나의 리렌더링이 발생하도록 그룹화
function AutoBatching() {
    const [counter, setCounter] = useState(0);

    const handleIncreaseCounter = () => {
        setCounter(prev => prev + 1);
        setCounter(prev => prev + 2);
    }

    return (
        <div>
            <button onClick={handleIncreaseCounter}>증가</button>
            <h1>Counter: {counter}</h1>
        </div>
    )
}

export default AutoBatching

/**
위 처럼 구현 시 React 17 버전에도 Batching은 적용이 가능하기 때문에 렌더링이 한 번만 발생
 */

function AutoBatching() {
    const [counter, setCounter] = useState(0);

    const handleIncreaseCounter = () => {
        setCounter(prev => prev + 1);
        setCounter(prev => prev + 2);
    }

    const handleDelayIncreaseCounter = () => {
        setTimeout(() => {
            setCounter(prev => prev + 1);
            setCounter(prev => prev + 2);
        }, 1000)
    }

    return (
        <div>
            <button onClick={handleIncreaseCounter}>증가</button>
            <button onClick={handleDelayIncreaseCounter}>1초 후 증가</button>
            <h1>Counter: {counter}</h1>
        </div>
    )
}

export default AutoBatching

/**
그러나 setTimeout으로 구현해 작동하면 React 17 버전까지는 렌더링이 두 번 작동
React 18 버전의 Batching은 이를 한 번만 작동되도록 가능
 */

function AutoBatching() {
    const [counter, setCounter] = useState(0);

    const handleIncreaseCounter = () => {
        setCounter(prev => prev + 1);
        setCounter(prev => prev + 2);
    }

    const handleDelayIncreaseCounter = () => {
        setTimeout(() => {
            flushSync(() => {
                setCounter(prev => prev + 1);
            })
            flushSync(() => {
                setCounter(prev => prev + 2);
            })
        }, 1000)
    }

    return (
        <div>
            <button onClick={handleIncreaseCounter}>증가</button>
            <button onClick={handleDelayIncreaseCounter}>1초 후 증가</button>
            <h1>Counter: {counter}</h1>
        </div>
    )
}

export default AutoBatching

/**
flushSync를 사용해 Batching 처리를 하지 않도록 가능 (잘 사용하지 않을 것)
 */