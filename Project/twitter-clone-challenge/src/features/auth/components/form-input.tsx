import { Error, Input, Label } from "../styles/auth-components";
import { FormInputProps } from "../types/auth-type";

export const FormInput = ({
  register,
  name,
  placeholder,
  type,
  error,
  rules,
  setValue,
}: FormInputProps) => (
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
      onInput={(e) =>
        setValue?.(name, (e.target as HTMLInputElement).value, {
          shouldValidate: true,
        })
      }
    />
    {error && <Error className="error">{error.message}</Error>}
  </div>
);
