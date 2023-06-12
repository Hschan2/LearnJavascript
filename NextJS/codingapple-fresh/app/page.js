import Link from "next/link"

export default function Home() {
  const name = "Hong"

  return (
    <div>
      <h4 className="title">상품목록</h4>
      <p className="title-sub">By dev {name}</p>
    </div>
  )
}
