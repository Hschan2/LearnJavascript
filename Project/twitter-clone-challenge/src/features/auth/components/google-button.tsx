import { GoogleAuthProvider } from "firebase/auth";
import SocialButton from "./social-button";
import { Logo } from "../../../layout/styles/button-components";

function GoogleButton() {
  return (
    <SocialButton provider={GoogleAuthProvider} className="googleBtn">
      <Logo src="google-logo.svg" />
      Google로 로그인
    </SocialButton>
  );
}

export default GoogleButton;
