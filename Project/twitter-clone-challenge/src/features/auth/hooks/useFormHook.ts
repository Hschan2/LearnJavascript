import { useForm } from "react-hook-form";

export const useFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  return { register, handleSubmit, errors, getValues };
};
