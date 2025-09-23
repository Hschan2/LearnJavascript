import { useNavigate } from "react-router";
import { useAuth } from "./useAuthAction";
import { useFormHook } from "./useFormHook";

export const useAccount = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, setValue, watch } = useFormHook();
  const { login, signUp, isLoading, error, clearError } = useAuth();

  const handleAuth = async (authFn: () => Promise<boolean>) => {
    clearError();
    if (await authFn()) navigate("/");
  };

  const onLoginSubmit = handleSubmit((data) =>
    handleAuth(() => login(data.email.trim(), data.password))
  );

  const onCreateSubmit = handleSubmit((data) => {
    if (!data.name) return;
    handleAuth(() => signUp(data.name!, data.password));
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    onLoginSubmit,
    onCreateSubmit,
    setValue,
    watch,
  };
};
