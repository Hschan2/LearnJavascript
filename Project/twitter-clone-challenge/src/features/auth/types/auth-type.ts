import { AuthProvider } from "firebase/auth";
import {
  FieldError,
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export interface AuthFormValues {
  email: string;
  name?: string;
  password: string;
  code?: string;
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
  watch?: UseFormWatch<AuthFormValues>;
};

export type FormInputProps = {
  register: UseFormRegister<AuthFormValues>;
  name: Path<AuthFormValues>;
  placeholder: string;
  type: string;
  error?: FieldError;
  rules?: RegisterOptions;
  setValue?: UseFormSetValue<AuthFormValues>;
  watch?: UseFormWatch<AuthFormValues>;
};

export interface SocialButtonProps {
  provider: AuthProvider;
  className: string;
  children: React.ReactNode;
}
