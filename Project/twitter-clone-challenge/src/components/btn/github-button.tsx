import { GithubAuthProvider } from "firebase/auth";
import { Logo } from "../style/button-components";
import SocialButton from "./social-button";

function GithubButton() {
  return (
    <SocialButton provider={GithubAuthProvider} className="githubBtn">
      <Logo src="github-logo.svg" />
      Github로 로그인
    </SocialButton>
  );
}

export default GithubButton;
