import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type AccountProps = {
  onCreateSubmit?: () => void;
  onLoginSubmit?: () => void;
  register: any;
  errors: any;
  isLoading: boolean;
  error: string | null;
  onSendEmailCode: () => void;
  onVerifyEmailCode: () => void;
  onSignUp: () => void;
  isEmailVerified: boolean;
};

export type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  type: string;
  error?: FieldError;
  rules?: RegisterOptions;
};

export interface SocialButtonProps {
  provider: typeof GoogleAuthProvider | typeof GithubAuthProvider;
  className: string;
  children: React.ReactNode;
}
