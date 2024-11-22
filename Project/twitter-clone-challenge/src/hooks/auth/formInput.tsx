import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Error, Input } from "../../components/style/auth-components";

type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  type: string;
  error?: FieldError;
  rules?: RegisterOptions;
};

export const FormInput = <T extends FieldValues>({
  register,
  name,
  placeholder,
  type,
  error,
  rules,
}: FormInputProps<T>) => (
  <div>
    <Input {...register(name, rules)} placeholder={placeholder} type={type} />
    {error && <Error className="error">{error.message}</Error>}
  </div>
);
