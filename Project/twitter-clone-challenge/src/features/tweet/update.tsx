import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import UpdateTweetForm from "./update-tweet-form";
import { FormWrapper } from "./styles/form-components";
import { auth } from "../../firebase";
import { WrongMessage } from "../error/styles/error-components";
import { useDetailTweet } from "./hooks/useTweet";

function Update() {
  const { tweetId } = useParams();

  if (!tweetId) return <WrongMessage>잘못된 요청입니다.</WrongMessage>;

  const { tweet } = useDetailTweet(tweetId);
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId !== tweet?.userId) {
      alert("접근할 수 없는 경로입니다.");
      navigate("/");
      return;
    }
  }, [userId, tweet?.userId]);

  if (userId !== tweet?.userId)
    return <WrongMessage>접근할 수 없습니다.</WrongMessage>;

  return (
    <FormWrapper>
      <UpdateTweetForm id={tweetId} />;
    </FormWrapper>
  );
}

export default Update;
