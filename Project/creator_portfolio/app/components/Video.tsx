import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const Video = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <DynamicReactPlayer
      url="https://www.youtube.com/watch?v=Qi5GzIhYxQw"
      controls
      width="100%"
      height="650px"
    />
  ) : null;
};

export default Video;
