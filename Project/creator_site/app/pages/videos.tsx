import React from "react";
import { ICategoriesProps, IVideo } from "../types/videoType";
import VideosTitle from "../components/utils/videos-title";
import VideoButton from "../components/utils/video-button";

function Videos({ categories, title }: ICategoriesProps) {
  return (
    <div>
      <VideosTitle>{title}</VideosTitle>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category: IVideo) => (
          <VideoButton
            key={category.url}
            size="w-32 h-28"
            data={category}
          />
        ))}
      </div>
    </div>
  );
}

export default Videos;
