import Nav from '../components/Nav'
import Head from 'next/head'

// 인자 값 받아서 사용하기
// children: 해당 페이지 내용
const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>Next JS</title>
                <meta keyword="Next JS"/>
                <meta content="Next JS"/>
            </Head>
            <Nav />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout