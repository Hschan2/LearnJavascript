// 만약에 NextJS가 about 컴포넌트를 실행하려고 할 때, about.js의 export default된 함수를 Component 프롭으로서 _app.js 파일 내 App 함수에 전달

import Layout from "../components/Layout";
import "../styles/globals.css";

// index.js의 getServerSideProps()의 return props가 전달될 수 있는 것은 pageProps 덕분
export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}