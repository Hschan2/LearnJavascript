import { CreateAccountUI } from "./components/create-account-ui";
import { useAuth } from "./hooks/useAuthAction";
import { useFormHook } from "./hooks/useFormHook";

function CreateAccount() {
  const { register, errors, getValues } = useFormHook();
  const {
    sendSignUpCode,
    verifySignUpCode,
    signUp,
    isEmailVerified,
    isLoading,
    error,
  } = useAuth();

  const onSendEmailCode = () => sendSignUpCode(getValues("email"));
  const onVerifyEmailCode = () =>
    verifySignUpCode(getValues("email"), getValues("code"));
  const onSignUp = () => signUp(getValues("name"), getValues("password"));

  return (
    <CreateAccountUI
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
      onSendEmailCode={onSendEmailCode}
      onVerifyEmailCode={onVerifyEmailCode}
      onSignUp={onSignUp}
      isEmailVerified={isEmailVerified}
    />
  );
}

export default CreateAccount;
