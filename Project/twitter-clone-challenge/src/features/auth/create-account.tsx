import { useAccount } from "./hooks/useAccountAction";
import { CreateAccountUI } from "./components/create-account-ui";

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
