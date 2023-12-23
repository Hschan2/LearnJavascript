import Title from "./components/common/Title";
import Main from "./components/features/Main";
import Motion from "./components/features/Motion";
import Footer from "./components/common/Footer";
import VIDEOS from "./constants/Videos";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col space-y-14 items-center justify-between p-10">
      <Title />
      <Main />
      <Motion videoCategory={VIDEOS.motionGraphics} categoryTitle={VIDEOS.title.motionGraphic} />
      <Motion videoCategory={VIDEOS.travel} categoryTitle={VIDEOS.title.travel} />
      <Footer />
    </main>
  );
}
