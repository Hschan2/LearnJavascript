import { useRouter } from "next/router";
import Seo from '../../components/Seo';

export default function Detail({ data }) {
    const router = useRouter();

    const {title, poster_path, overview, genres, production_companies, runtime, vote_average} = data || [];
    let genreText = genres.map((genre) => {
        return genre.name;
    });

    let productCompanyText = production_companies.map((pc) => {
        return pc.name;
    });

    return (
        <div>
            <div className="container">
                <Seo title={title} />
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
                <h2>{title || "로딩중..."}</h2>
                <div className="basicInfo">
                    <div>{productCompanyText.join(', ')}</div>
                    <div>{genreText.join(', ')}</div>
                    <div>{runtime} 분</div>
                    <div>({vote_average}점 / 10점)</div>
                </div>
                <div className="borderBottom"></div>
                <div className="overview">{overview}</div>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                }

                img {
                    border-radius: 12px;
                    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
                }

                .basicInfo {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: rgba(0, 0, 0, 0.8);
                    font-size: 12px;
                    margin: -10px 0 12px 0;
                }

                .basicInfo div {
                    margin: 2px 0 2px 0;
                }

                .borderBottom {
                    width: 100%;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
                    margin-bottom: 12px;
                }

                .overview {
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
}

export async function getServerSideProps({params: {params}}) {
    
    const [title, id] = params;

    const data = await (await fetch(`http://localhost:3000/api/movies/${id}`)).json();

    return {
        props: {
            data
        },
    };
}