import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { AuthService } from "./authService";

type FormType = {
  name?: string;
  email: string;
  password: string;
};

export const useAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const { login, signUp, isLoading, error, clearError } = useAuth();
  const [nameMessage, setNameMessage] = useState<string | null>(null);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [isNameValidating, setIsNameValidating] = useState(false);

  const validateName = async (name: string) => {
    if (name) {
      setIsNameValidating(true);
      const isDuplicate = await AuthService.checkDuplicateName(name);
      setNameMessage(
        isDuplicate
          ? "이미 사용하고 있는 이름입니다."
          : "사용할 수 있는 이름입니다."
      );
      setIsNameValidating(false);
    } else {
      setNameMessage(null);
    }
  };

  const validateEmail = async (email: string) => {
    if (email) {
      const isDuplicate = await AuthService.checkDuplicateEmail(email);
      setEmailMessage(
        isDuplicate
          ? "이미 사용하고 있는 이메일입니다."
          : "사용할 수 있는 이메일입니다."
      );
    } else {
      setEmailMessage(null);
    }
  };

  const onLoginSubmit: SubmitHandler<FormType> = async (data) => {
    clearError();
    if (await login(data.email, data.password)) {
      navigate("/");
    }
  };

  const onCreateSubmit: SubmitHandler<FormType> = async (data) => {
    clearError();
    if (
      data.name &&
      data.email &&
      (await signUp(data.name, data.email, data.password))
    ) {
      navigate("/");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    onLoginSubmit,
    onCreateSubmit,
    nameMessage,
    validateName,
    emailMessage,
    validateEmail,
    isNameValidating,
  };
};
