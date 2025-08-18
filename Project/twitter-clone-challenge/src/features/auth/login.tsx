import { useAccount } from "./hooks/useAccountAction";
import { LoginUI } from "./components/login-ui";

function Login() {
  const { onLoginSubmit, register, errors, isLoading, error, setValue } =
    useAccount();

  return (
    <LoginUI
      onLoginSubmit={onLoginSubmit}
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
      setValue={setValue}
    />
  );
}

export default Login;
