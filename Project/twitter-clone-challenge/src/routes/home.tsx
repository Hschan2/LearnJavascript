import PostTweetForm from "../components/form/post-tweet-form";
import Timeline from "../components/screen/timeline";
import { Wrapper } from "./style/home-components";

function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}

export default Home;
