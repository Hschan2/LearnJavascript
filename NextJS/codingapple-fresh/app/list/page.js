import Image from 'next/image'
import React from 'react'
import firstFood from '@/public/images/food0.png'
import secondFood from '@/public/images/food1.png'
import thirdFood from '@/public/images/food2.png'

const List = () => {
  const products = ['Tomatoes', 'Pasta', 'Coconut']

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {products.map((product, key) => {
        return (
          <div className="food" key={key}>
            {/* Image로 이미지 최적화, 최적화는 기능 개발을 모두 마친 뒤 진행 */}
            {/* <Image src={firstFood} alt='Food' className='food-img' /> */}
            {/* 외부 이미지를 사용할 때는, width와 height 필수 설정, next.config.js 파일 설정 필수 */}
            {/* <Image src="https://s3.amazonaws.com/my-bucket/profile.png" width="500" height="500"/> */}
            <img src={`@/public/images/food${key}.png`} alt='Food' className='food-img' />
            <h4>{product} $40</h4>
          </div>
        )
      })}
    </div>
  )
}

export default List