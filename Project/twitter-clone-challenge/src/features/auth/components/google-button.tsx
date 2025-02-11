import { GoogleAuthProvider } from "firebase/auth";
import { Logo } from "../../components/style/button-components";
import SocialButton from "./social-button";

function GoogleButton() {
  return (
    <SocialButton provider={GoogleAuthProvider} className="googleBtn">
      <Logo src="google-logo.svg" />
      Google로 로그인
    </SocialButton>
  );
}

export default GoogleButton;
