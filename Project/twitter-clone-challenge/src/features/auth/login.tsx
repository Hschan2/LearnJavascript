import { useAccount } from "./hooks/useAccountAction";
import { LoginUI } from "./components/login-ui";

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
