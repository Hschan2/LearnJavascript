import useRouter from "../hook/useRouter";

const Home = () => {
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
};

export default Home;
