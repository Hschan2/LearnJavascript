import { NextFetchEvent, NextRequest, NextResponse, userAgent } from 'next/server'

// Custom matcher config || Conditional statements
const COOKIES = {
    JWT_TOKEN: 'jwt_token',
}

export const config = {
    // 한 번에 여러 경로 설정 가능
    // matcher: ['/auth/:path*', '/dashboard/:path*'],
    // matcher: '/auth/:path*',
    matcher: '/((?!.*\\.).*)',
}

// Middleware 적용하기
export function meddleware(req: NextRequest, res:NextResponse, ev: NextFetchEvent) {
    // Custom matcher config
    const token = req.cookies.get(COOKIES.JWT_TOKEN)
    const url = req.nextUrl
    // Check Web or Mobile
    const { device } = userAgent(req)
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
    url.searchParams.set('viewport', viewport)

    // Header
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-hello-from-middleware1', 'hello')

    const responseHeader = NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    })

    // /auth 하위에 모든 경로를 접속 시도할 때, cookie에 token이 존재하지 않으면 아래의 조건 실행
    if (!token) {
        // ...
    }

    // Conditional statements
    if (!token && req.nextUrl.pathname.includes('/auth')) {

    }

    if (req.nextUrl.pathname.startsWith('/about')) {
        return NextResponse.rewrite(new URL('/about2', req.url))
    }

    // Cookie
    let cookie = req.cookies.get('nextjs')?.value
    console.log(cookie) // 'fast
    const allCookies = req.cookies.getAll()
    console.log(allCookies) // [{ name: 'nextjs', value: 'fast' }]

    req.cookies.has('nextjs') // true
    req.cookies.delete('nextjs') // 삭제 -> has('nextjs') => false

    const response = NextResponse.next() // ResponseCookies API로 응답에 대한 쿠키 설정
    response.cookies.set('vercel', 'fast')
    response.cookies.set({
        name: 'vercel',
        value: 'fast',
        path: '/test',
    })
    cookie = response.cookies.get('vercel')
    console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/test' }

    // 실제 사례
    if (!token && req.nextUrl.pathname.includes('/test')) {
        const cloneUrl = req.nextUrl.clone()

        // local과 production 조건에 다라 hostname 설정
        cloneUrl.hostname = '...'

        // local과 production에 따라 port 구분
        if (
            /// production인 경우
        ) {
            cloneUrl.protocol = 'https:'
            cloneUrl.port = '443'
        }
        
        cloneUrl.search = `redirect_url=${encodeURIComponent(req.nextUrl.pathname)}`

        return NextResponse.redirect(cloneUrl.href)
    }
}