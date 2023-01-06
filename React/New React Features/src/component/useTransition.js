import React, { useState } from 'react'

// 렌더링이 시작하고 나면 중간에 중단할 수 없다는 단점이 존재
// useTransition으로 예방
// 사용자 입력 시에도 화면 업데이트가 유지
function useTransition() {
    const [isPending, startTransition] = useTransition();
    const [boxCount, setBoxCount] = useState(0);

    const handleUpdate = ({ target }) => {
        startTransition(() => {
                setBoxCount(target.value.length);
            }
        )
    }

    return (
        <div>
            <input type="text" onChange={handleUpdate} />
            {/* isPending일 경우(Loading) 해당 h1 출력  */}
            {isPending && <h1>Pending...</h1>}
        </div>
    )
}

export default useTransition