import VIDEOS from "../constants/Videos";
import ProjectTitle from "../ui/ProjectTitle";
import VideoButton from "../ui/VideoButton";

function Main() {
  return (
    <div>
      <ProjectTitle>{VIDEOS.title.portfolio}</ProjectTitle>
      <VideoButton size="w-96 h-80 text-7xl" />
    </div>
  );
}

export default Main;
