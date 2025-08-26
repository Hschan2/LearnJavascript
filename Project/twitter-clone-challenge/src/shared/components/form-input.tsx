import { useEffect } from "react";
import { FormInputProps } from "../../features/auth/types/auth-type";
import { Error, Input, Label } from "../../features/auth/styles/auth-components";

export const FormInput = ({
  register,
  name,
  placeholder,
  type,
  error,
  rules,
  setValue,
  watch,
}: FormInputProps) => {
  const value = watch?.(name);

  useEffect(() => {
    if (value != null && setValue) {
      setValue(name, value.trim(), { shouldValidate: true });
    }
  }, [value, name, setValue]);

  return (
    <div>
      <Label htmlFor={name}>{placeholder}</Label>
      <Input
        {...register(name, rules)}
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        autoComplete={
          name === "email"
            ? "username"
            : name === "password"
            ? "current-password"
            : "off"
        }
      />
      {error && <Error className="error">{error.message}</Error>}
    </div>
  );
};
