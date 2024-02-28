import React from "react";
import { ICategoriesProps, IVideo } from "../types/videoType";
import VideosTitle from "../components/utils/videos-title";
import dynamic from "next/dynamic";

const VideoButton = dynamic(() => import("../components/utils/video-button"));

function Videos({ categories, title }: ICategoriesProps) {
  return (
    <div>
      <VideosTitle>{title}</VideosTitle>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category: IVideo, index) => (
          <VideoButton
            key={index}
            size="w-32 h-28"
            data={category}
          />
        ))}
      </div>
    </div>
  );
}

export default Videos;
