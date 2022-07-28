// 5. File-Based Routing
// 6. Nested Routes (app/routes/posts)
import { Outlet } from 'remix'

function Posts() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Posts
