import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css'; // Object로 가져온다.

export default function NavBar() {
    // Router는 지금 나의 위치(home인가 about인가)를 확인할 수 있는 것
    const router = useRouter();

    return (
        <nav>
            <img src="/vercel.svg" />
            <div>
                <Link href="/">
                    <a className={router.pathname === '/' ? "active" : ""}>인기순</a>
                </Link>
                <Link href="/highRated">
                    <a className={router.pathname === '/highRated' ? "active" : ""}>평점순</a>
                </Link>
                <Link href="/upcoming">
                    <a className={router.pathname === '/upcoming' ? "active" : ""}>개봉예정</a>
                </Link>
            </div>
            <style jsx>{`
                nav {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 20px;
                    padding-bottom: 10px;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                }

                img {
                    max-width: 100px;
                    margin-bottom: 5px;
                }

                nav a {
                    font-weight: 600;
                    font-size: 18px;
                }

                .active {
                    color: tomato;
                }

                nav div {
                    display: flex;
                    gap: 10px;
                }
            `}</style>
        </nav>
    )
}