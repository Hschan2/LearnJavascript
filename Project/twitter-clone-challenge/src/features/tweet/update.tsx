import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import UpdateTweetForm from "./update-tweet-form";
import { FormWrapper } from "./styles/form-components";
import { auth } from "../../firebase";
import { WrongMessage } from "../error/styles/error-components";
import { useDetailTweet } from "./hooks/useTweetAction";
import { SERVICE_ERROR_MESSAGE } from "../../message";

function Update() {
  const { tweetId } = useParams();
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;
  const { tweet } = useDetailTweet(tweetId || "");

  const isOwner = useMemo(
    () => userId === tweet?.userId,
    [userId, tweet?.userId]
  );

  useEffect(() => {
    if (tweet && !isOwner) {
      alert(SERVICE_ERROR_MESSAGE.WRONG_PATH);
      navigate("/");
    }
  }, [isOwner, navigate, tweet]);

  if (!tweetId) return <WrongMessage>잘못된 요청입니다.</WrongMessage>;

  if (isOwner) return <WrongMessage>접근할 수 없습니다.</WrongMessage>;

  return (
    <FormWrapper>
      <UpdateTweetForm id={tweetId} />;
    </FormWrapper>
  );
}

export default Update;
