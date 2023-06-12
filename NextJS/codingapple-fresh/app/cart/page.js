// 'use client' // 이것을 사용하면 아래의 모든 함수는 Client Component
// HTML에 자바스크립트 기능 넣는 것 가능, useState, useEffect 등 사용 가능
// 자바스크립트 로드로 인해 로딩속도 느림, Hydration(HTML 유저에게 보낸 후 자바스크립트로 HTML 다시 읽고 분석하는 일) 필요
// 자바스크립트 기능이 필요한 곳만 추천 (+ 버튼 등)

import React from 'react'
import {count, name} from './data'
import Hello from './hello'

const Cart = () => {
    return (
        <div>
            <Hello />
            <h4 className='title'>{name} Cart {count}</h4>
            <CartItem />
            <CartItem />
        </div>
    )
}

// 아래처럼 아무렇게나 만든 함수가 Server Component
// HTML에 자바스크립트 기능 넣는 것 불가능, useState, useEffect 등 사용 불가
// 로딩속도 빠름, 검색엔진 노출 유리
// 큰 페이지에 추천
function CartItem() {
    return (
        <div className='cart-item'>
            <p>상품명</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    )
}

export default Cart
