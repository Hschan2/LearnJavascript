import Editor from './Editor';
import LinkButton from "./LinkButton";
import { getItem, removeItem, setItem } from './storage';
import { request } from './api';

export default function PostEditPage({ $main, initialState }) {
    const $page = document.createElement('div');

    this.state = initialState;

    let postLocalSaveKey = `temp-post-${this.state.postId}`;
    const post = getItem(postLocalSaveKey, {
        title: '',
        content: ''
    })

    this.setState = async (nextState) => {
        if (this.state.postId !== nextState.postId) {
            postLocalSaveKey = `temp-post-${nextState.postId}`;
            this.state = nextState;

            if (this.state.postId === 'new') {
                const post = getItem(postLocalSaveKey, {
                    title: '',
                    content: ''
                });

                this.render();
                editor.setState(post);
            } else {
                await fetchPost();
            }

            return
        }

        this.state = nextState;
        this.render();

        editor.setState(this.state.post || {
            title: '',
            content: ''
        });
    }

    let timer = null;
    const editor = new Editor({
        $main: $page,
        initialState: post,
        onEditing: (post) => {
            if (timer !== null) {
                clearTimeout(timer);
            }

            timer = setTimeout(async () => {
                setItem(postLocalSaveKey, {
                    ...post,
                    tempSaveData: new Date()
                });

                const isNew = this.state.postId === 'new';

                if (isNew) {
                    const createdPost = await request('/posts', {
                        method: 'POST',
                        body: JSON.stringify(post)
                    })

                    history.replaceState(null, null, `/posts/${createdPost.id}`);
                    removeItem(postLocalSaveKey);
                    this.setState({
                        postId: createdPost.id
                    })
                } else {
                    await request(`/posts/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    });

                    removeItem(postLocalSaveKey);
                }
            }, 2000);
        }
    })

    this.render = () => {
        $main.appendChild($page);
    };

    const fetchPost = async () => {
        const { postId } = this.state;

        if (postId !== 'new') {
            const post = await request(`/posts/${postId}`);
            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
            });

            if (tempPost.tempSaveData && tempPost.tempSaveData > post.updated_at) {
                if (confirm('저장되지 않은 임시 데이터가 있어요. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    })

                    return
                }
            }

            this.setState({
                ...this.state,
                post
            })
        }
    }

    new LinkButton({
        $main: $page,
        initialState: {
            text: '목록으로',
            link: '/'
        }
    });
}