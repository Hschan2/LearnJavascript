

export default function Home({posts}) {
  return (
    <div>
      <h1>Hello Next JS</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// SSR (Server Side Rendering)
// export const getServerSideProps = async () => {
//   // const res = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_end=10');
//   const res = await fetch('http://localhost:8080/api/posts');
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   }
// }

// Static
// api의 데이터를 변경해도 적용되지 않음
// 이전에 HTML 파일에 이미 생성을 해서 접근을 했기 때문에 (getServerSideProps로 생성)
export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_end=10');
  // const res = await fetch('http://localhost:8080/api/posts');
  const posts = await res.json();

  return {
    props: {
      posts
    },
    // 20초 뒤에는 기존 HTML에 생성된 것을 재생성
    revalidate: 20
  }
}