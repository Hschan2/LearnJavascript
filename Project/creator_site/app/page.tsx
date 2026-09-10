"use client";

import dynamic from "next/dynamic";
import { CATEGORIES_TITLE } from "./common/utils/constants";
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
      <Videos category="travel" title={CATEGORIES_TITLE.travel} />
      <Videos category="short" title={CATEGORIES_TITLE.shortForm} />
      <Videos category="motion" title={CATEGORIES_TITLE.motionGraphic} />
      <InstagramLink />
      <Footer />
    </main>
  );
}
