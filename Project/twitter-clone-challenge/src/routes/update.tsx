import { useLocation } from "react-router";
import UpdateTweetForm from "../components/form/update-tweet-form";
import { FormWrapper } from "../components/style/form-components";

function Update() {
  const location = useLocation();
  const id = location.state?.tweetIdValue;

  return (
    <FormWrapper>
      <UpdateTweetForm id={id} />;
    </FormWrapper>
  );
}

export default Update;
