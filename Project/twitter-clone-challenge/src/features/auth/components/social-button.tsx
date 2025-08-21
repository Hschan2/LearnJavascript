import { Button } from "../../../layout/styles/button-components";
import { SocialButtonProps } from "../types/auth-type";
import { useSocialAuth } from "../hooks/useSocialAuth";

function SocialButton({ provider, className, children }: SocialButtonProps) {
  const { socialWithProvider } = useSocialAuth();

  return (
    <Button className={className} onClick={() => socialWithProvider(provider)}>
      {children}
    </Button>
  );
}

export default SocialButton;
