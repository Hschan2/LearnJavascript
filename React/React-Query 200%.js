// 예시 코드로 공부하는 React-Query로 코드를 200% 더 좋게 만들기
// https://www.youtube.com/watch?v=lVLz_ASqAio
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useParams } from "react-router-dom";

// main
const queryClient = new QueryClient();

<BrowserRouter>
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
    </QueryClientProvider>
</BrowserRouter>

// Posts
import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"
import { PostList } from "./PostList"

const { status, error, data: posts } = useQuery({
    queryKey: ["posts"], // 쿼리의 Key, 어떤 Key명도 가능
    queryFn: getPosts // 쿼리로 가져올 외부 함수
})

if (status === 'loading') return <h1>Loading</h1>
if (status === 'error') return <h1>{JSON.stringify(error)}</h1>

return (
    <>
        <PostList posts={posts} />
    </>
)

// ports
export function getPosts() {
    return axios
        .get<Post[]>("http://localhost:3000/posts", { params: { _sort: "title" } })
        .then(res => res.data)
}

// Post
export function Post() {
    const { id } = useParams()
    const {
        status: statusPost,
        error: errorPost,
        data: post
    } = useQuery({
        queryKey: ["posts", parseInt(id!)],
        queryFn: () => getPosts(id!)
    })
}

// Mutation
export function CreatePost() {
    const { status, error, mutate } = useMutation({
        mutationFn: CreatePost,
        onError: ...,
        onSuccess: newPost => {
            queryClient.setQueryData(["posts", newPost.id], newPost)
            navigate(`/posts/${newPost.id}`)
        },
    })

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        mutate({
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
        })
    }
}

export function CreatePost({ title, body }: { title: string, body: string }) {
    return axios
        .post<Post>("http://localhost:3000/posts", {
            title,
            body,
            useId: 1,
            id: Date.now(),
        })
        .then(res => res.data)
}

// Pagination
export function PaginatedPosts() {
    const [params] = useSearchParams()
    const page = paramInt(params.get("page")!) || 1

    const { status, error, data, fetchStatus } = useQuery({
        queryKey: ["posts", { page }],
        keepPreviousData: true,
        queryFn: () => getPostsPaginated(page),
    })

    return (
        <>
            {fetchStatus === "fetching" && "Loading"}
            {data.previousPage && (
                <Link to={`/paginated?page=${data.previousPage}`}>이전</Link>
            )}{" "}
            {data.nextPage && (
                <Link to={`/paginated?page=${data.nextPage}`}>다음</Link>
            )}
        </>
    )
}

export function getPostsPaginated(page: number) {
    return axios
        .get < Post[] > ("http://localhost:3000/posts", {
            params: {_page: page, _sort: "title"},
        })
        .then(res => {
            const hasNext = page * 10 <= parseInt(res.headers["x-total-count"] as string) - 10
            return {
                nextPage: hasNext ? page + 1 : undefined,
                previousPage: page > 1 ? page - 1 : undefined,
                posts: res.data
            }
        })
}

// InfiniteScroll
export function InfinitePosts() {
    const {
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery<{
            nextPage: number | undefined,
            previousPage: number | undefined,
            posts: Post[]
        } > ({
            queryKey: ["posts", "infinite"],
            getNextPageParam: prevData => prevData.nextPage,
            queryFn: ({pageParam = 0}) => getPostsPaginated(pageParam),
    })
}