import { json, useActionData } from "build"
import { Link, redirect } from "remix"
import { db } from '~/utils/db.server'
import { getUser } from "~/utils/session.server"

function validateTitle(title) {
    if (typeof title !== 'string' || title.length < 3) {
        return '제목을 3글자 이상으로 작성해주세요.'
    }
}

function validateBody(body) {
    if (typeof body !== 'string' || body.length < 10) {
        return '본문을 10글자 이상으로 작성해주세요.'
    }
}

function badRequest(data) {
    return json(data, { status: 400 })
}

// 8. Actions
// 14. Submit Post via Action (글 작성)
export const action = async ({ request }) => {
    // New Post에서 입력한 제목과 내용을 가져온다.
    const form = await request.formData()
    const title = form.get('title')
    const body = form.get('body')
    const user = await getUser(request)
    const fields = { title, body }

    const fieldError = {
        title: validateTitle(title),
        body: validateBody(body)
    }

    if (Object.values(fieldError).some(Boolean)) {
        console.log(fieldError)
        return badRequest({ fieldError, fields })
    }

    // @todo - 데이터베이스에 Submit
    const post = await db.post.create({ data: fields })

    // 글 쓰기 버튼 클릭 시 해당 글로 이동
    return redirect(`/posts/${post.id}`)
}

function newPost() {
    const actionData = useActionData()

    return (
        <>
            <div className="page-header">
                <h1>새 포스트</h1>
                <Link to='/posts' className='btn btn-reverse'>
                    뒤로
                </Link>
            </div>

            <div className="page-content">
                <form method='POST'>
                    <div className="form-control">
                        <label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title" defaultValue={actionData?.fields?.title} />
                        <div className='error'>
                            {actionData?.fieldError?.title ? (
                                <p className='form-validation-error' role='alert' id='title-error'>
                                    {actionData.fieldError.title}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="body">본문</label>
                        <textarea name="body" id="body" defaultValue={actionData?.fields.body} />
                        <div className='error'>
                            {actionData?.fieldError?.body ? (
                                <p className='form-validation-error' role='alert' id='body-error'>
                                    {actionData.fieldError.body}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <button type='submit' className="btn btn-block">
                        작성
                    </button>
                </form>
            </div>
        </>
    )
}

export default newPost