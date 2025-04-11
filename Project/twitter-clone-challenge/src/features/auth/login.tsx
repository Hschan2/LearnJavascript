import { useAccount } from "./hooks/useAccountAction";
import { LoginUI } from "./components/login-ui";

function Login() {
  const { onLoginSubmit, register, errors, isLoading, error } = useAccount();

  return (
    <LoginUI
      onLoginSubmit={onLoginSubmit}
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default Login;
