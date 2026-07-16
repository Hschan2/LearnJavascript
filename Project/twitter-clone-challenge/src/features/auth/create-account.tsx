import { CreateAccountUI } from "./components/create-account-ui";
import { useAuth } from "./hooks/useAuthAction";
import { useFormHook } from "./hooks/useFormHook";

function CreateAccount() {
  const { register, errors, getValues } = useFormHook();
  const {
    signUp,
    isLoading,
    error,
  } = useAuth();

  const onSignUp = () => signUp(getValues("name") || "", getValues("email") || "", getValues("password") || "");

  return (
    <CreateAccountUI
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
      onSignUp={onSignUp}
    />
  );
}

export default CreateAccount;
