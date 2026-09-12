"use client";

import React, { useEffect, useState } from "react";
import { CATEGORIES_TITLE } from "../common/utils/constants";
import VideosTitle from "../components/utils/videos-title";
import dynamic from "next/dynamic";
import { IVideo } from "../types/videoType";

const VideoButton = dynamic(() => import("../components/utils/video-button"), {
  ssr: false,
});

function Portfolio() {
  const [portfolioVideo, setPortfolioVideo] = useState<IVideo | null>(null);

  useEffect(() => {
    const fetchPortfolioVideo = async () => {
      try {
        const response = await fetch("/api/youtube?category=portfolio");

        if (!response.ok) {
          throw new Error("Portfolio 영상을 가져오지 못했습니다.");
        }

        const data = await response.json();

        setPortfolioVideo(data.videos[0] ?? null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPortfolioVideo();
  }, []);

  return (
    <div>
      <VideosTitle>{CATEGORIES_TITLE.portfolio}</VideosTitle>

      {portfolioVideo && (
        <div className="w-full max-w-96">
          <VideoButton size="w-full aspect-[6/5]" data={portfolioVideo} />
        </div>
      )}
    </div>
  );
}

export default Portfolio;
