import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { Button, Logo } from "../style/button-componenets";

function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button className="googleBtn" onClick={onClick}>
      <Logo src="google-logo.svg" />
      Google로 로그인
    </Button>
  );
}

export default GoogleButton;
