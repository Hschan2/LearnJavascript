import Title from "./components/common/Title";
import Footer from "./components/common/Footer";
import VIDEOS from "./constants/Videos";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./components/features/Main"));
const Content = dynamic(() => import("./components/features/Content"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col space-y-14 items-center justify-between p-10">
      <Title />
      <Main />
      <Content
        videoCategory={VIDEOS.motionGraphics}
        categoryTitle={VIDEOS.title.motionGraphic}
      />
      <Content
        videoCategory={VIDEOS.travel}
        categoryTitle={VIDEOS.title.travel}
      />
      <Footer />
    </main>
  );
}
