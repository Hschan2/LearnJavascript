import { useSocialAuth } from "../../features/auth/hooks/useSocialAuth";
import { SocialButtonProps } from "../../features/auth/types/auth-type";
import { Button } from "../../layout/styles/button-components";

function SocialButton({ provider, className, children }: SocialButtonProps) {
  const { socialWithProvider } = useSocialAuth();

  return (
    <Button className={className} onClick={() => socialWithProvider(provider)}>
      {children}
    </Button>
  );
}

export default SocialButton;
