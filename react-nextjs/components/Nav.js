import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    {/* index로 이동 */}
                    <Link href="/"><a>Home</a></Link>
                </li>
                <li>
                    {/* photos.js로 이동 */}
                    <Link href="/photos"><a>Photos</a></Link>
                </li>
            </ul>
        </nav>
        
    )
}

export default Nav
