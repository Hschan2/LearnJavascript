import PostPage from "./PostPage";
import PostEditPage from "./PostEditPage";
import {initRouter} from './router'

/**
 * 
 * @param {div} $main 
 * 
 * 규칙, URL
 * Root, postPage 그리는 것
 * 
 * /posts/{id}, id에 해당하는 post 생성
 * /post/new, 새로운 post 생성
 */
export default function App({ $main }) {
    // main의 id를 가진 요소 전달
    const postPage = new PostPage({ $main });

    const postEditPage = new PostEditPage({
        $main,
        // 초기값 설정
        initialState: {
            // 아이디는 새로운 값
            postId: 'new',
            // 보낼 데이터의 아이디, 내용 초기화
            post: {
                id: '',
                content: ''
            }
        }
    });

    // 내부 함수
    this.route = () => {
        $main.innerHTML = '';
        const { pathname } = window.location;

        // 일종의 라우터 기능, 사용자가 다른 경로로 이동할 때 적절한 페이지 렌더링
        if (pathname === '/') {
            console.log("Root로 이동합니다.")
            postPage.render();
        } else if (pathname.indexOf('/post/' === 0)) { // 경로가 /post/ 로 시작하는가?
            // '/posts/:postId'와 같은 경로에서 postId 값을 추출
            const [, , postId] = pathname.split('/');

            postEditPage.setState({
                postId: postId
            });
        }
    }

    this.route();
    initRouter(() => this.route());
}