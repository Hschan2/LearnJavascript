import { FieldValues } from "react-hook-form";
import { Error, Input, Label } from "../styles/auth-components";
import { FormInputProps } from "../types/auth-type";

export const FormInput = <T extends FieldValues>({
  register,
  name,
  placeholder,
  type,
  error,
  rules,
}: FormInputProps<T>) => (
  <div>
    <Label htmlFor={name}>{placeholder}</Label>
    <Input
      {...register(name, rules)}
      id={name}
      placeholder={placeholder}
      type={type}
      autoComplete={name}
    />
    {error && <Error className="error">{error.message}</Error>}
  </div>
);
