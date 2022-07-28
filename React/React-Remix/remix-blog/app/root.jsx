// 1. Root Route Module & Document (시작 파일)
import { useLoaderData } from "build"
import { Outlet, LiveReload, Link, Links, Meta } from "remix"
import globalStylesUrl from '~/styles/global.css'
import { getUser } from "./utils/session.server"

export const links = () => [{ rel: 'stylesheet', href:globalStylesUrl }]

export const meta = () => {
  const description = 'A cool blog built with Remix'
  const keywords = 'remix, react, javascript'

  return {
    description,
    keywords
  }
}

export const loader = async ({ request }) => {
  const user = await getUser(request)
  const data = {
    user,
  }

  return data
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({ children, title }) {
  return (
    <html lang='en'>
      <head>
        {/* 4. Meta Function */}
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <title>{title ? title : 'My Remix Blog'}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

// 2. Create Layout
function Layout({ children }) {
  const { user } = useLoaderData()

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>

        <ul className="nav">
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
          {user ? (
            <li>
              <form action='/auth/logout' method='POST'>
                <button type='submit' className='btn'>
                  로그아웃 {user.username}
                </button>
              </form>
            </li>
          ) : (
            <li>
              <Link to='/auto/login'>로그인</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="container">
        {children}
      </div>
    </>
  )
}

// 9. ErrorBoundary Function
export function ErrorBoundary({error}) {
  return (
      <Document>
        <Layout>
          <h1>Error</h1>
          <p>{error.message}</p>
        </Layout>
      </Document>
  )
}