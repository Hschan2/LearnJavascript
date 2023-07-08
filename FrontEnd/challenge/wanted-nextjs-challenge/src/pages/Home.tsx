import useRouter from "../hook/useRouter";

export default function Home() {
    const {push} = useRouter()

    const moveAbout = () => {
        push('/about')
    }

    const moveCount = () => {
        push('/count')
    }

    return (
        <>
            <div>Root</div>
            <button onClick={moveAbout}>about</button>
            <button onClick={moveCount}>count</button>
        </>
    )
}
