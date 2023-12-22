import React from "react";
import VIDEOS from "../constants/Videos";
import { IVideo } from "../type/VideoType";
import ProjectTitle from "../ui/ProjectTitle";
import VideoButton from "./VideoButton";

function Motion() {
  return (
    <div>
      <ProjectTitle>{VIDEOS.title.motionGraphic}</ProjectTitle>
      <div className="grid grid-cols-3 gap-2">
        {VIDEOS.motionGraphics.map((motion: IVideo) => (
          <div className="space-y-2 mb-2" key={motion.url}>
            <VideoButton size="w-32 h-28 text-3xl" />
            <p className="text-xs">{motion.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Motion;
