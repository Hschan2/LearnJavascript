import { redirect } from 'remix'
import { logout } from '~/utils/session.server';

// 로그아웃
export const action = async ({ request }) => {
    return logout(request)
}

// 홈으로
export const loader = async () => {
    return redirect('/')
}