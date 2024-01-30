import { IVideoPlayer } from "@/app/types/videoType";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ videoLink, videoRef, isOpen }: IVideoPlayer) {
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("자동실행 오류:", error);
      });
    }
  }, [isOpen, videoRef]);

  return (
    // <video ref={videoRef} width="100%" height="auto" controls autoPlay={isOpen}>
    //   <source src={videoLink} type="video/webm" />
    //   <source src={videoLink} type="video/mp4" />
    // </video>
    <div>
      <ReactPlayer url={videoLink} controls playing={isOpen} width="720px" height="480px" />
    </div>
  );
}

export default VideoPlayer;
