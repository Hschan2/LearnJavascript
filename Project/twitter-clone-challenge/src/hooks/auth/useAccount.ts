import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

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
  };
};
