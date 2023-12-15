import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        style={{ width: "100%", height: "650px" }}
        src={"https://www.youtube.com/watch?v=vVnzE904Pag"}
      />
    </main>
  )
}
