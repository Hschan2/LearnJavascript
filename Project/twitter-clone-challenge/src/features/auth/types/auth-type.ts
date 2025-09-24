import { AuthProvider } from "firebase/auth";
import {
  FieldError,
  FieldErrors,
  FieldValues,
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
  confirmPassword?: string;
}

export interface IPasswordForm {
  password: string;
  confirmPassword?: string;
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

export type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  type: string;
  error?: FieldError;
  rules?: RegisterOptions;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
};

export interface SocialButtonProps {
  provider: AuthProvider;
  className: string;
  children: React.ReactNode;
}
