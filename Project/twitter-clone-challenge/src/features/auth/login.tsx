import { useAccount } from "./hooks/useAccountAction";
import { LoginUI } from "./components/login-ui";

function Login() {
  const { onLoginSubmit, register, errors, isLoading, error, setValue, watch } =
    useAccount();

  return (
    <LoginUI
      onLoginSubmit={onLoginSubmit}
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
      setValue={setValue}
      watch={watch}
    />
  );
}

export default Login;
