import Seo from "../components/Seo";
import Link from 'next/link';
import { useRouter } from "next/router";
import ToTop from "../components/toTop";

export default function Upcoming({results}) {

    const router = useRouter();
    const onClick = (id, title) => {
        router.push(`/movies/${title}/${id}`);
    }

    return (
        <div>
            <div className="container">
                <Seo title="개봉예정" />
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
    const {results} = await (await fetch(`http://localhost:3000/api/upcoming`)).json();
    
    return {
        props: {
            results,
        },
    };
}