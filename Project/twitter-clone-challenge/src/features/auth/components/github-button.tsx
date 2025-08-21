import { GithubAuthProvider } from "firebase/auth";
import { Logo } from "../../../layout/styles/button-components";
import SocialButton from "./social-button";

function GithubButton() {
  return (
    <SocialButton provider={new GithubAuthProvider()} className="githubBtn">
      <Logo src="github-logo.svg" />
      Github로 로그인
    </SocialButton>
  );
}

export default GithubButton;
