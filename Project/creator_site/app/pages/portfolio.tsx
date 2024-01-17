import React from "react";
import { CATEGORIES_TITLE } from "../common/utils/constants";
import VideosTitle from "../components/utils/videos-title";
import dynamic from "next/dynamic";

const VideoButton = dynamic(() => import("../components/utils/video-button"));

function Portfolio() {
  return (
    <div>
      <VideosTitle>{CATEGORIES_TITLE.portfolio}</VideosTitle>
      <VideoButton size="w-96 h-80 text-7xl" />
    </div>
  );
}

export default Portfolio;
