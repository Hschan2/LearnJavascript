import data from "../../data/blogs.json"

// JSON 파일로 저장한 데이터 요청 및 응답
export default function handler(req, res) {
    // let slug = req.body.slug
    let slug = "JS"
    let myblog = data.blogs.filter((blog) => {
        return blog.slug == slug
    })
    res.status(200).json({ blog: myblog[0] })
}