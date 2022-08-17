import HeadInfo from '../components/Headinfo'
import Image from 'next/image'
import photosStyles from '../styles/Photos.module.css'
import Link from 'next/link'

export const photos = ({photos}) => {
    return (
        <div>
            <HeadInfo title="Here, Next JS" />
            <h1>My Photos</h1>
            <ul className={photosStyles.photos}>
                {photos.map(photo => (
                    <li key = {photo.id}>
                        <Link href = {`/photos/${photo.id}`}>
                            <a>
                                <Image 
                                    src = {photo.url}
                                    width = {100}
                                    height = {100}
                                    alt = {photo.title}
                                />
                                <span>{photo.title}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const getStaticProps = async () => {
    // 외부 URL 사용
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_end=10');
    const photos = await res.json();
  
    return {
      props: {
        photos
      },
    }
  }

export default photos