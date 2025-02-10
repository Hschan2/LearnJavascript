import { useAccount } from "./hooks/useAccount";
import { CreateAccountUI } from "./components/CreateAccountUI";

function CreateAccount() {
  const {
    onCreateSubmit,
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
  } = useAccount();

  return (
    <CreateAccountUI
      onCreateSubmit={handleSubmit(onCreateSubmit)}
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default CreateAccount;
