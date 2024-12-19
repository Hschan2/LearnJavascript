import { useAccount } from "../hooks/auth/useAccount";
import { LoginUI } from "./components/LoginUI";

function Login() {
  const { onLoginSubmit, register, handleSubmit, errors, isLoading, error } =
    useAccount();

  return (
    <LoginUI
      onLoginSubmit={handleSubmit(onLoginSubmit)}
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default Login;
