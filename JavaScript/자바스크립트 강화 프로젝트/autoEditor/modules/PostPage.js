import PostList from "./PostList";
import LinkButton from "./LinkButton";
import { request } from "./api";

export default function PostPage({ $main }) {
    const $page = document.createElement('div');

    // 게시물 목록 담을 변수 생성
    const postList = new PostList({
        $main: $page,
        initialState: []
    })

    // 링크버튼 생성 (new post 버튼)
    new LinkButton({
        $main: $page,
        initialState: {
            text: 'new post',
            link: '/post/new'
        }
    })

    // posts 링크로 GET 요청을 해서 응답으로 받은 게시물 목록을 postList에 담기
    const fetchPost = async () => {
        const posts = await request('/posts', {
            method: 'GET'
        })

        postList.setState(posts);
    }

    // render 함수 (실행 함수)
    this.render = async () => {
        await fetchPost();
        $main.appendChild($page);
    }

    
}