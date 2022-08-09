import Seo from "../components/Seo";
import Link from 'next/link';
import { useRouter } from "next/router";
import ToTop from "../components/toTop";

export default function Home({results}) {

    // getServerSideProps에서 수행할 예정
    // const [movies, setMovies] = useState();

    const router = useRouter();
    const onClick = (id, title) => {
        // 영화 API 데이터를 가지고 상세 페이지 이동
        router.push(`/movies/${title}/${id}`);
    }

    return (
        <div>
            <div className="container">
                <Seo title="인기순" />
                {results?.map(movie => (
                    <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        <h4>
                            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                                <a>{movie.title}</a>
                            </Link>
                        </h4>
                    </div>
                ))}
            </div>
            <ToTop />

            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie {
                    cursor: pointer;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                    transition: transform 0.2s ease-in-out;
                }
                .movie:hover h4 {
                    transform: scale(1.10) translateY(-5px);
                }
            `}</style>
        </div>
    );
}

export async function getServerSideProps() {
    const {results} = await (await fetch(`http://localhost:3000/api/movies`)).json();
    
    return {
        props: {
            results,
        },
    };
}

/*
 export async function getStaticProps() {
    const {results} = await (await fetch(`http://localhost:3000/api/movies`)).json();

    return {
        props: {
            results,
        },
        // Static Regeneration은 정적인 데이터만 다루는 것이 아니다.
        // 빌드 시점에 페이지를 생성하고 일정 주기마다 데이터의 최신 여부를 검사하고 업데이트된 데이터로 페이지를 다시 생성한다.
        // revalidate를 생성해 갱신 주기(초)를 추가하면 된다. (예. 15초)
        revalidate: 15,
    };
}
*/