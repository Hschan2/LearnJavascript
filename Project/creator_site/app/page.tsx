import dynamic from "next/dynamic";
import { CATEGORIES_VIDEOS } from "./common/utils/constants";
import Footer from "./pages/footer";
import Title from "./pages/title";

const Portfolio = dynamic(() => import("./pages/portfolio"));
const Videos = dynamic(() => import("./pages/videos"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Title />
      <Portfolio />
      <Videos categories={CATEGORIES_VIDEOS} />
      <Footer />
    </main>
  );
}
