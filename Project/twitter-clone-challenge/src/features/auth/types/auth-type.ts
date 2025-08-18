import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import {
  FieldError,
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface AuthFormValues {
  email: string;
  name?: string;
  password: string;
}

export type AccountProps = {
  onCreateSubmit?: () => void;
  onLoginSubmit?: () => void;
  register: UseFormRegister<AuthFormValues>;
  errors: FieldErrors<AuthFormValues>;
  isLoading: boolean;
  error: string | null;
  onSendEmailCode?: () => void;
  onVerifyEmailCode?: () => void;
  onSignUp?: () => void;
  isEmailVerified?: boolean;
  setValue?: UseFormSetValue<AuthFormValues>;
};

export type FormInputProps = {
  register: UseFormRegister<AuthFormValues>;
  name: Path<AuthFormValues>;
  placeholder: string;
  type: string;
  error?: FieldError;
  rules?: RegisterOptions;
  setValue?: UseFormSetValue<AuthFormValues>;
};

export interface SocialButtonProps {
  provider: typeof GoogleAuthProvider | typeof GithubAuthProvider;
  className: string;
  children: React.ReactNode;
}
