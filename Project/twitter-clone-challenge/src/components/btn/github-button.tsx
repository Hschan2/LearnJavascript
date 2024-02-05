import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { Button, Logo } from "../style/button-componenets";

function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button className="githubBtn" onClick={onClick}>
      <Logo src="github-logo.svg" />
      Github로 로그인
    </Button>
  );
}

export default GithubButton;
