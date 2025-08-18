import { useForm } from "react-hook-form";
import { AuthFormValues } from "../types/auth-type";

export const useFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<AuthFormValues>();

  return { register, handleSubmit, errors, getValues, setValue };
};
