import React from "react";
import VIDEOS from "../constants/Videos";
import { Video } from "../type/VideoType";

function Motion() {
  return (
    <div>
      <h1 className="text-xl font-sans font-bold mb-5">제목</h1>
      <div className="grid grid-cols-3 gap-2">
        {VIDEOS.motionGraphics.map((motion: Video) => (
          <div className="space-y-2 mb-2" key={motion.url}>
            <p className="w-32 h-28 bg-gray-200 rounded-lg" />
            <p className="text-xs">{motion.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Motion;
