import { IVideoTitle } from "@/app/types/videoType";
import React from "react";

function VideosTitle({ children }: IVideoTitle) {
  return <h1 className="text-xl font-sans font-black mb-5 ml-1.5">{children}</h1>;
}

export default VideosTitle;
