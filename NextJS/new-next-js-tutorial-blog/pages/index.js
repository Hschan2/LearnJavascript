import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container">
      <h1 className='my-4'>환영합니다.</h1>
      <div className="Cards">
        <div class="card" style={{width: '18rem'}}>
          <img src="http://t1.daumcdn.net/brunch/service/user/8TE/image/2xXGrL1iffAGXuY3oPKrhmTqma4.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Next JS 튜토리얼</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="/blogpost/js-tutorial" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </div>
  )
}
