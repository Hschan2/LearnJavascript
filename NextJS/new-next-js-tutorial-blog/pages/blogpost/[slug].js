import React from 'react'
import { useRouter } from 'next/router'
import blogs from '../../data/blogs.json'
import Head from 'next/head'

const Slug = ({myblog}) => {
    const router = useRouter()
    // URL의 파라미터. 예. blogpost/js-tutorial로 접근 시, blogpost 폴더의 [slug] 파일의 slug는 js-tutorial
    const { slug } = router.query
    
  return (
    <div className='container'>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{myblog.title} - Blog</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
      </Head>
      <h4 className='my-4'>{myblog.title}</h4>
      {/* author 데이터가 있으면 출력 없으면 빈값 */}
      {myblog.author && <p>Author: {myblog.author}</p>}
      {/* <p>{myblog.content}</p> */}
      {/* dangerouslySetInnerHTML => 문자열에 HTML 코드 입력이 가능하도록(JSON 파일 안 내용 확인) */}
      <p dangerouslySetInnerHTML={{__html: myblog.content}}></p>
    </div>
  )
}

export default Slug

export async function getServerSideProps(context) {
  let myblog = blogs.blogs.filter((blog) => {
    return blog.slug == context.query.slug
  })
  return {
    props: {myblog: myblog[0]},
  }
}