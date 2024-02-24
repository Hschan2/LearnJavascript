import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { Button } from "../style/button-components";

interface SocialButtonProps {
  provider: typeof GoogleAuthProvider | typeof GithubAuthProvider;
  className: string;
  children: React.ReactNode;
}

function SocialButton({ provider, className, children }: SocialButtonProps) {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const authProvider = new provider();
      await signInWithPopup(auth, authProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
      throw new Error(`소셜미디어 로그인 실패: ${error}`);
    }
  };

  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
}

export default SocialButton;
