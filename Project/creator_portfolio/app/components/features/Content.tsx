import React from "react";
import { IVideo, IVideoCategory } from "../../type/VideoType";
import ProjectTitle from "../common/ProjectTitle";
import dynamic from "next/dynamic";

const VideoButton = dynamic(() => import("../ui/VideoButton"));

function Content({ videoCategory, categoryTitle }: IVideoCategory) {
  return (
    <div>
      <ProjectTitle>{categoryTitle}</ProjectTitle>
      <div className="grid grid-cols-3 gap-2">
        {videoCategory.map((motion: IVideo) => (
          <div className="space-y-2 mb-2" key={motion.url}>
            <VideoButton size="w-32 h-28 text-3xl" image={motion.image} />
            <p className="text-xs">{motion.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
