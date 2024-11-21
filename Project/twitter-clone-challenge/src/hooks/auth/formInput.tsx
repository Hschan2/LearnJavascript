import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Error, Input } from "../../components/style/auth-components";

type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  type: string;
  error?: FieldError;
};

export const FormInput = <T extends FieldValues>({
  register,
  name,
  placeholder,
  type,
  error,
}: FormInputProps<T>) => (
  <div>
    <Input {...register(name)} placeholder={placeholder} type={type} />
    {error && <Error className="error">{error.message}</Error>}
  </div>
);
