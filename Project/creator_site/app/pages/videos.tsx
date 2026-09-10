"use client";

import React, { useEffect, useState } from "react";
import { ICategoriesProps, IVideo } from "../types/videoType";
import VideosTitle from "../components/utils/videos-title";
import dynamic from "next/dynamic";
import useInfiniteScroll from "../hooks/useIinfiniteScroll";

const VideoButton = dynamic(() => import("../components/utils/video-button"), {
  ssr: false,
});

function Videos({ category, title }: ICategoriesProps) {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [visibleItems, setVisibleItems] = useState<number>(10);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`/api/youtube?category=${category}`);

        if (!response.ok) {
          throw new Error("영상을 가져오지 못했습니다.");
        }

        const data = await response.json();

        setVideos(data.videos ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, [category]);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const { target } = useInfiniteScroll(loadMoreItems);

  return (
    <div>
      <VideosTitle>{title}</VideosTitle>

      <div className="grid grid-cols-3 gap-3">
        {videos
          .slice(0, visibleItems)
          .map((video: IVideo, index) => (
            <VideoButton
              key={index}
              size="w-32 h-28"
              data={video}
            />
          ))}

        <div ref={target}></div>
      </div>
    </div>
  );
}

export default Videos;
