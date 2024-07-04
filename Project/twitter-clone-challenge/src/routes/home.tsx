import MainSlide from "../components/screen/MainSlide";
import Timeline from "../components/screen/timeline";
import { Wrapper } from "./style/home-components";

function Home() {
  return (
    <Wrapper>
      <MainSlide />
      <Timeline />
    </Wrapper>
  );
}

export default Home;
