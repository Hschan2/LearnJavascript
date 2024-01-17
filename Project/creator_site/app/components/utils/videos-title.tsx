import { IVideoTitle } from "@/app/types/videoType";
import React from "react";

function VideosTitle({ children }: IVideoTitle) {
  return <h1 className="text-xl font-sans font-bold mb-5">{children}</h1>;
}

export default VideosTitle;
