import { GoogleAuthProvider } from "firebase/auth";
import SocialButton from "../../../shared/components/social-button";
import { Logo } from "../../../layout/styles/button-components";

function GoogleButton() {
  return (
    <SocialButton provider={new GoogleAuthProvider()} className="googleBtn">
      <Logo src="google-logo.svg" />
      Google로 로그인
    </SocialButton>
  );
}

export default GoogleButton;
