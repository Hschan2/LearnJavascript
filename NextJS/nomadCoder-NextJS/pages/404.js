// 404 에러가 발생했을 시, 나타낼 페이지
// 404.js 로 파일명을 만들면 404에러가 발생할 시 자동으로 출력

import Seo from "../components/Seo";

export default function NotFound() {
    return (
        <div>
            <Seo title="404 Error" />
            <div className="container">
                <div className="box error">404 Error</div>
                <div className="box checkAgain">페이지를 다시 확인해주세요.</div>
            </div>
            
            
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .box {
                    align-items: center;
                    margin-top: 150px;
                }

                .error {
                    font-weight: bold;
                    font-size: 2rem;
                }

                .checkAgain {
                    margin-top: 10px;
                    text-decoration-line: underline;
                }
            `}</style>
        </div>
    )
}