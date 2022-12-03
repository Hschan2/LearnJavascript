import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container">
      <h1 className='my-4'>환영합니다.</h1>
      <div className="Cards">
        <div className="card" style={{width: '18rem'}}>
          <img src="http://t1.daumcdn.net/brunch/service/user/8TE/image/2xXGrL1iffAGXuY3oPKrhmTqma4.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Next JS 튜토리얼</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            {/* blogpost 폴더의 [slug] 파일로 이동 */}
            <a href="/blogpost/js-tutorial" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </div>
  )
}
