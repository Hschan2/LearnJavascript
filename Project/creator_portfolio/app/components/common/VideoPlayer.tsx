import { IVideoPlayer } from "@/app/type/Types";
import React, { useEffect } from "react";

function VideoPlayer({ videoLink, videoRef, isOpen }: IVideoPlayer) {
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("자동실행 오류:", error);
      });
    }
  }, [isOpen, videoRef]);

  return (
    <video
      ref={videoRef}
      width="100%"
      height="auto"
      controls
      autoPlay={isOpen}
    >
      <source src={videoLink} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
