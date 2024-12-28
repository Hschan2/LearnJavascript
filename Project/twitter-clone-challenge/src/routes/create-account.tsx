import { useAccount } from "../hooks/auth/useAccount";
import { CreateAccountUI } from "./components/CreateAccountUI";

function CreateAccount() {
  const {
    onCreateSubmit,
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    nameMessage,
    validateName,
    emailMessage,
    validateEmail,
    isNameValidating,
  } = useAccount();

  return (
    <CreateAccountUI
      onCreateSubmit={handleSubmit(onCreateSubmit)}
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
      validateName={validateName}
      nameMessage={nameMessage}
      validateEmail={validateEmail}
      emailMessage={emailMessage}
      isNameValidating={isNameValidating}
    />
  );
}

export default CreateAccount;
