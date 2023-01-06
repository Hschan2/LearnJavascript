import React, { lazy, Suspense } from 'react'

/**
기존 SSR 문제
    - 모든 Data Fetch가 종료되어야 출력
    - 모든 자바스크립트 코드 로딩 전 Hydration 단계 접근 불가
    - 앱이 상호 작용할 수 있는 상태가 되기 위해서는 전체가 Hydration이 완료되어야
 */
function SSR() {
    const Comments = lazy(() => import("./SSR.js"));

  return (
      <Suspense fallback={<SSR />}>
          <Comments />
    </Suspense>
  )
}

export default SSR

/**
Lazy로 선택적 Hydration이 가능
 */