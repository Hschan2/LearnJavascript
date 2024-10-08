import React from "react";
import { CATEGORIES_TITLE, PORTFOLIO_VIDEO } from "../common/utils/constants";
import VideosTitle from "../components/utils/videos-title";
import dynamic from "next/dynamic";

const VideoButton = dynamic(() => import("../components/utils/video-button"), {
  ssr: false,
});

function Portfolio() {
  return (
    <div>
      <VideosTitle>{CATEGORIES_TITLE.portfolio}</VideosTitle>
      <VideoButton size="w-96 h-80" data={PORTFOLIO_VIDEO} />
    </div>
  );
}

export default Portfolio;
