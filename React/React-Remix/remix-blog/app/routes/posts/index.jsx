// http://localhost:3000/posts/
// 7. Loaders
import { useLoaderData, Link } from 'remix'
import { db } from '~/utils/db.server'

// 13. Load Posts via Loader
export const loader = async () => {
    const data = {
        // DB에서 모두 가져오기
        posts: await db.post.findMany({
            // 20개 가져오기
            take: 20,
            select: { id: true, title: true, createAt: true },
            orderBy: { createAt: 'desc' }
        }),
    }

    return data
}

function PostItems() {
    // DB의 데이터 Load
    const { posts } = useLoaderData()

    return (
        <>
            <div className="page-header">
                <h1>포스트</h1>
                <Link to='/posts/new' className='btn'>
                    새 포스트
                </Link>
            </div>
            
            <ul className="posts-list">
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={post.id}>
                            <h3>{post.title}</h3>
                            {new Date(post.createAt).toLocaleDateString()}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PostItems