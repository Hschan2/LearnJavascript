import bcrypt from 'bcrypt'
import { db } from './db.server'
import { createCookieSessionStorage, redirect } from 'remix'

// 로그인
export async function login({ username, password }) {
    const user = await db.user.findUnique({
        where: {
            username,
        },
    })

    if (!user) return null

    // 비밀번호 확인
    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isCorrectPassword) return null

    return user
}

// 회원가입
export async function register({ username, password }) {
    const passwordHash = await bcrypt.hash(password, 10)

    return db.user.create({
        data: {
            username,
            passwordHash
        },
    })
}

// 세션 가져오기
const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) throw new Error('Session Secret 없음')

// 세션 스토리지 생성
const storage = createCookieSessionStorage({
    cookie: {
        name: 'remixblog_session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 60,
        httpOnly: true
    },
})

// 유저 세션 생성
export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession()
    session.set('userId', userId)

    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

// 유저 세션 가져오기
export function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'))
}
  
// 유저의 로그 가져오기
export async function getUser(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    
    if (!userId || typeof userId !== 'string') {
        return null
    }
  
    try {
        const user = await db.user.findUnique({ 
            where: { 
                id: userId 
            } 
        })
        return user
    } catch (error) {
        return null
    }
}
  
  // 로그아웃, 세션 제거
export async function logout(request: Request) {
    const session = await storage.getSession(request.headers.get('Cookie'))
    return redirect('/auth/logout', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}