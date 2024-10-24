"use client";

import dynamic from "next/dynamic";
import { CATEGORIES_TITLE, CATEGORIES_VIDEOS } from "./common/utils/constants";
import Footer from "./pages/footer";
import Title from "./pages/title";
import InstagramLink from "./pages/insta_link";

const Portfolio = dynamic(() => import("./pages/portfolio"));
const Videos = dynamic(() => import("./pages/videos"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 gap-y-16">
      <Title />
      <Portfolio />
      <Videos
        categories={CATEGORIES_VIDEOS.travel}
        title={CATEGORIES_TITLE.travel}
      />
      <Videos
        categories={CATEGORIES_VIDEOS.shortForm}
        title={CATEGORIES_TITLE.shortForm}
      />
      <Videos
        categories={CATEGORIES_VIDEOS.motionGraphics}
        title={CATEGORIES_TITLE.motionGraphic}
      />
      <InstagramLink />
      <Footer />
    </main>
  );
}
