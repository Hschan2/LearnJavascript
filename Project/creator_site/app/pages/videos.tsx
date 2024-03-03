"use client";

import React, { useEffect, useState } from "react";
import { ICategoriesProps, IVideo } from "../types/videoType";
import VideosTitle from "../components/utils/videos-title";
import dynamic from "next/dynamic";
import useInfiniteScroll from "../hooks/useIinfiniteScroll";

const VideoButton = dynamic(() => import("../components/utils/video-button"));

function Videos({ categories, title }: ICategoriesProps) {
  const [visibleItems, setVisibleItems] = useState<number>(10);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const { target } = useInfiniteScroll(loadMoreItems);

  return (
    <div>
      <VideosTitle>{title}</VideosTitle>
      <div className="grid grid-cols-3 gap-3">
        {categories.slice(0, visibleItems).map((category: IVideo, index) => (
          <VideoButton key={index} size="w-32 h-28" data={category} />
        ))}
        <div ref={target}></div>
      </div>
    </div>
  );
}

export default Videos;
