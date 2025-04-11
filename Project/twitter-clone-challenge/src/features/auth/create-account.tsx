import { useAccount } from "./hooks/useAccountAction";
import { CreateAccountUI } from "./components/create-account-ui";

function CreateAccount() {
  const {
    onCreateSubmit,
    register,
    errors,
    isLoading,
    error,
  } = useAccount();

  return (
    <CreateAccountUI
      onCreateSubmit={onCreateSubmit}
      register={register}
      errors={errors}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default CreateAccount;
