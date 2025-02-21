import { useForm } from "react-hook-form";

export const useFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return { register, handleSubmit, errors };
};
