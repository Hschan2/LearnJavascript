import useRouter from "../hook/useRouter";

export default function Home() {
    const {push} = useRouter()

    const moveAbout = () => {
        push('/about')
    }

    return (
        <>
            <div>Root</div>
            <button onClick={moveAbout}>about</button>
        </>
    )
}
