import React from "react";
import { ICategoriesProps, IVideo } from "../types/videoType";
import VideosTitle from "../components/utils/videos-title";

function Videos({categories}: ICategoriesProps) {
  return (
    <div>
      <VideosTitle>제목</VideosTitle>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((category: IVideo) => (
          <div className="space-y-2 mb-2" key={category.url}>
            <p className="w-32 h-28 bg-gray-200 rounded-lg" />
            <p className="text-xs">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;
