import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import UpdateTweetForm from "../components/form/update-tweet-form";
import { FormWrapper } from "../components/style/form-components";
import { auth } from "../firebase";
import { WrongMessage } from "../components/style/error-components";

function Update() {
  const { tweetId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tweetUserId = location.state?.uid;
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId !== tweetUserId) {
      alert("접근할 수 없는 경로입니다.");
      navigate("/");
      return;
    }
  }, [userId, tweetUserId]);

  if (userId !== tweetUserId)
    return <WrongMessage>접근할 수 없습니다.</WrongMessage>;
  if (!tweetId) return <WrongMessage>잘못된 요청입니다.</WrongMessage>;

  return (
    <FormWrapper>
      <UpdateTweetForm id={tweetId} />;
    </FormWrapper>
  );
}

export default Update;
