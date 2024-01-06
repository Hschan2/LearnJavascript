import dynamic from "next/dynamic";
import VIDEOS from "../../constants/Videos";
import ProjectTitle from "../common/ProjectTitle";

const VideoButton = dynamic(() => import("../ui/VideoButton"));

function Main() {
  return (
    <div>
      <ProjectTitle>{VIDEOS.title.portfolio}</ProjectTitle>
      <VideoButton size="w-96 h-80 text-7xl" data={VIDEOS.portfolio} />
    </div>
  );
}

export default Main;
