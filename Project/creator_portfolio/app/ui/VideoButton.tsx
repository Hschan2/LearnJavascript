import React from "react";
import { IButtonProps } from "../type/Types";

function VideoButton({size}: IButtonProps) {
  return (
    <button className={`${size} bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-black`}>
      ▶️
    </button>
  );
}

export default VideoButton;
