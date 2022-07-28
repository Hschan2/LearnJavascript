// http://localhost:3000/posts/아이디아무거나
import { Link, useLoaderData, redirect } from 'remix'
import { db } from '~/utils/db.server'
import { getUser } from '~/utils/session.server'

// 15. Load Single Post
export const loader = async ({ request, params }) => {
    const user = await getUser(request)

    const post = await db.post.findUnique({
        where: {
            id: params.postId
        }
    })

    if (!post) throw new Error('전송할 수 없습니다.')

    const data = { post, user }
    return data
}

// 16. Delete Post via Action
export const action = async ({ request, params }) => {
    const form = await request.formData()

    if (form.get('_method') === 'delete') {
        const post = await db.post.findUnique({
            where: {
                id: params.postId
            },
        })
    
        if (!post) throw new Error('전송할 수 없습니다.')

        if (user && post.userId === user.id) {
            await db.post.delete({
                where: {
                    id: params.postId
                }
            })
        }
        
        return redirect('/posts')
    }
}

function Post() {
    const { post, user } = useLoaderData()

    return (
        <div>
            <div className="page-header">
                <h1>{post.title}</h1>
                <Link to='/posts' className='btn btn-reverse'>
                    뒤로
                </Link>
            </div>

            <div className="page-content">
                {post.body}
            </div>

            {/* 16. Delete Post via Action */}
            <div className="page-footer">
                {user.id === post.userId && (
                    <form method="POST">
                        <input type="hidden" name="_method" value="delete" />
                        <button className="btn btn-delete">삭제</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Post