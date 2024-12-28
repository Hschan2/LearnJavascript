import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Error, Input, Label } from "../style/auth-components";

type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  type: string;
  error?: FieldError;
  rules?: RegisterOptions;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const FormInput = <T extends FieldValues>({
  register,
  name,
  placeholder,
  type,
  error,
  rules,
  onBlur,
}: FormInputProps<T>) => (
  <div>
    <Label htmlFor={name}>{placeholder}</Label>
    <Input
      {...register(name, rules)}
      id={name}
      placeholder={placeholder}
      type={type}
      autoComplete={name}
      onBlur={onBlur}
    />
    {error && <Error className="error">{error.message}</Error>}
  </div>
);
