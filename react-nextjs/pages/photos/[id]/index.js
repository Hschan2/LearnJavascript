import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'

// 이미지 자세히 보기
const index = ({ photo }) => {
    // router로 Props 받기
    // const { title, url } = photo, getStaticProps 제거 후 사용
    // const router = useRouter();

    const { title, url } = photo
    return (
        <div>
            {/* <h2>{router.query.id}</h2> */}
            <h2>{title}</h2>
            <Image 
                src = {url}
                width = {500}
                height = {500}
                alt = {title}
            />
            <Link href = "/photos">
                이전
            </Link>
        </div>
    )
}

// Props 받기
export const getStaticProps = async (context) => {
    const {id} = context.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    const photo = await res.json();

    return {
        props: {
            photo
        }
    }
}

// For Router Path
export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_end=10');
    const photos = await res.json();
    const ids = photos.map(photo => photo.id);
    const paths = ids.map(id => {
        return {
            params: {id: id.toString()}
        }
    })

    return {
        paths,
        // false - index 11번부터 404 Error
        fallback: false,
    }
}

export default index
