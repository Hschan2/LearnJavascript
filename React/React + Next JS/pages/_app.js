import '../styles/globals.css'
import Layout from '../components/Layout'

// 어느 페이지에 이동해도 Layout 고정
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
