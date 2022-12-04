import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import blogs from '../data/blogs.json'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home({ blogs }) {
  
  useEffect(() => {
    console.log(blogs);
  }, [])

  return (
    <div className="container">
      <h1 className='my-4 text-center'>환영합니다.</h1>
      <div className="Cards row justify-content-center">
        {blogs.blogs.map((blog) => {
          return <div className="card mx-4 my-3" style={{width: '18rem'}}>
            <img src="http://t1.daumcdn.net/brunch/service/user/8TE/image/2xXGrL1iffAGXuY3oPKrhmTqma4.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.content.substr(0, 122)}...</p>
              {/* blogpost 폴더의 [slug] 파일로 이동, Next JS 13 버전 Link안 a태그 삭제 */}
              <Link href={"blogpost/" + blog.slug} className="btn btn-primary">Read More</Link>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

// 서버사이드렌더링 기본 구조로 구현
// Blogs.json 파일의 데이터를 Props로 이용
export async function getServerSideProps(context) {
  return {
    props: {blogs},
  }
}