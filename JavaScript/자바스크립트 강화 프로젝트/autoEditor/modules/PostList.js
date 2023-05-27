import { push } from './router';

export default function PostList({ $main, initialState }) {
    const $postList = document.createElement('div');

    // html의 main 아이디를 가진 div에 $postList 추가
    $main.appendChild($postList);
    // 여기 state에 넘어온 초기값 담기
    this.state = initialState;

    // 만약, 다음 state 데이터가 있으면 담아서 render 실행
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $postList.innerHTML = `
            <ul>
                ${this.state.map(post => `
                    <li data-id=${post.id}>${post.title}</li>
                `).join('')}
            </ul>
        `;
    }

    $postList.addEventListener('click', e => {
        const $li = e.target.closest('li');

        if ($li) {
            const { id } = $li.dataset;
            push(`/posts/${id}`);
        }
    })

    this.render();
}