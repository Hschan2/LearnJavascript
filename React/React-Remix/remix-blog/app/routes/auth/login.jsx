import { useActionData, redirect, json } from 'remix';
import { db } from '~/utils/db.server';
import { createUserSession, login, logout, register } from '~/utils/session.server';

// 이름 유효 검사
function validateUsername(username) {
    if (typeof username !== 'string' || username.length < 3) {
        return '이름을 3글자 이상으로 작성해주세요.'
    }
}

// 비밀번호 유효 검사
function validatePassword(password) {
    if (typeof password !== 'string' || username.length < 6) {
        return '비밀번호를 6글자 이상으로 작성해주세요.'
    }
}

// 잘못된 요청
function badRequest(data) {
    return json(data, { status: 400 })
}

// 실행
export const action = async ({ request }) => {
    const form = await request.formData()
    const loginType = form.get('loginType')
    const username = form.get('username')
    const password = form.get('password')

    const fields = { loginType, username, password }

    const fieldError = {
        username: validateUsername(username),
        password: validatePassword(password)
    }

    if (Object.values(fieldError).some(Boolean)) {
        return badRequest({ fieldError, fields })
    }

    switch(loginType) {
        case 'login': {
            // 유저 찾기
            const user = await login({ username, password })

            // 유저 확인
            if (!user) {
                return badRequest({
                    fields,
                    fieldError: { username: '유효하지 않음' },
                })
            }

            // 세션 생성
            return createUserSession(user.id, '/posts')
        }

        case 'register': {
            // 유저 유무 확인
            const userExists = await db.user.findFirst({
                where: {
                    username,
                },
            })

            if (userExists) {
                return badRequest({
                    fields,
                    fieldError: { username: `이미 ${username}이 존재합니다.` }
                })
            }

            // 유저 생성
            const user = await register({ username, password })
            if (!user) {
                return badRequest({
                    fields,
                    formError: '잘못된 접근입니다.'
                })
            }

            return createUserSession(user.id, '/posts')
        }

        default: {
            return badRequest({
                fields,
                formError: '로그인을 해주세요.'
            })
        }
    }

    return redirect('/posts')
}

function Login() {
    const actionData = useActionData()

    return (
        <div className='auth-container'>
            <div className='page-header'>
                <h1>로그인</h1>
            </div>

            <div className='page-content'>
                <form method='POST'>
                <fieldset>
                    <legend>로그인 | 회원가입</legend>
                    <label>
                        <input
                            type='radio'
                            name='loginType'
                            value='login'
                            defaultChecked={
                            !actionData?.fields?.loginType ||
                            actionData?.fields?.loginType === 'login'
                            }
                        />{' '}
                        로그인
                    </label>

                    <label>
                        <input
                            type='radio'
                            name='loginType'
                            value='register'
                            defaultChecked={actionData?.fields?.loginType === 'register'}
                        />{' '}
                        회원가입
                    </label>
                </fieldset>
                <div className='form-control'>
                    <label htmlFor='username'>사용자 이름</label>
                    <input
                    type='text'
                    name='username'
                    id='username'
                    defaultValue={actionData?.fields?.username}
                    />
                    <div className='error'>
                        {actionData?.fieldErrors?.username ? (
                            <p
                            className='form-validation-error'
                            role='alert'
                            id='username-error'
                            >
                            {actionData.fieldErrors.username}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className='form-control'>
                    <label htmlFor='password'>비밀번호</label>
                    <input
                    type='password'
                    name='password'
                    id='password'
                    defaultValue={actionData?.fields?.password}
                    />
                    <div className='error'>
                    {actionData?.fieldErrors?.password ? (
                        <p
                        className='form-validation-error'
                        role='alert'
                        id='password-error'
                        >
                        {actionData.fieldErrors.password}
                        </p>
                    ) : null}
                    </div>
                </div>

                <button className='btn btn-block' type='submit'>
                    로그인
                </button>
                </form>
            </div>
        </div>
    )
}

export default Login