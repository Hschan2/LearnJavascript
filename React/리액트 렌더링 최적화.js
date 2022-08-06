/*
React Rendering 최적화
    - 불필요한 렌더링을 줄이는 것

리렌더링이 되는 조건
    - State가 변경되었을 때
    - Prop이 변경되었을 때

*/

const { useCallback, useMemo } = require("react");

// useCallback Function 사용
// 리렌더링이 되더라도 동일한 참조값을 유지
const handleClick = useCallback(() => { }, []);

return (
    <>
        <div onClick={handleClick} />
    </>
)

/**
그러나 위 처럼 작성해도 리렌더링이 되는 것은 그대로
그러나 Render Phase, Commit Phase 과정 발생
*/

// React Memo: 변화 전과 후가 같을 때 렌더링을 발생하지 않도록
function Memo({ onClick }) {
    return (
        <>
        </>
    )
}

export default React.memo(Memo);

/**
그러나 객체를 Props로 넘겨주게 된다면?
리렌더링이 발생한다.
매번 다른 객체를 전달받기 때문에 Memo를 사용해도 매번 다른 객체를 사용하는 것이기 때문에 리렌더링 발생
*/

// useMemo: 값이 변경되지 않은 이상 기존 값 반환
// item의 값이 변화하지 않은 이상 기존 item 값을 전달
const item = {
    name: 'props',
    price: '1,000,000'
}

const memoizedItem = useMemo(() => item, []);

/**
가장 좋은 최적화는 근본적인 코드를 개선하는 것
 */