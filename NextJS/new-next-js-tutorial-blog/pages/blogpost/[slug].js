import React from 'react'
import { useRouter } from 'next/router'

const Slug = () => {
    const router = useRouter()
    // URL의 파라미터. 예. blogpost/js-tutorial로 접근 시, blogpost 폴더의 [slug] 파일의 slug는 js-tutorial
    const { slug } = router.query
    
  return (
      <div className='container'>
          <h4 className='my-4'>자바스크립트 튜토리얼</h4>
          <p>{slug}</p>
          <p>
            자바스크립트는 객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 브라우저 내에서 주로 사용되며, 다른 응용 프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있다. 또한 Node.js와 같은 런타임 환경과 같이 서버 프로그래밍에도 사용되고 있다.
          </p>
      </div>
  )
}

export default Slug