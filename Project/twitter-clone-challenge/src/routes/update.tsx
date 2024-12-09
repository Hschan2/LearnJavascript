import { useParams } from "react-router";
import UpdateTweetForm from "../components/form/update-tweet-form";
import { FormWrapper } from "../components/style/form-components";

function Update() {
  const { tweetId } = useParams();

  if (!tweetId) return <div>잘못된 요청입니다.</div>;

  return (
    <FormWrapper>
      <UpdateTweetForm id={tweetId} />;
    </FormWrapper>
  );
}

export default Update;
