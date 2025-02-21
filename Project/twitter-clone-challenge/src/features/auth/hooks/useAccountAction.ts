import { useNavigate } from "react-router";
import { useAuth } from "./useAuthAction";
import { useFormHook } from "./useFormHook";

export const useAccount = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useFormHook();
  const { login, signUp, isLoading, error, clearError } = useAuth();

  const handleAuth = async (authFn: () => Promise<boolean>) => {
    clearError();
    if (await authFn()) navigate("/");
  };

  const onLoginSubmit = handleSubmit((data) =>
    handleAuth(() => login(data.email, data.password))
  );

  const onCreateSubmit = handleSubmit(
    (data) =>
      data.name &&
      handleAuth(() => signUp(data.name, data.email, data.password))
  );

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
