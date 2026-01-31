import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  AuthWrapper,
  Title,
  Form,
  Error,
  Switcher,
  Button,
} from "./styles/auth-components";
import { FormInput } from "../../shared/components/form-input";
import { validationRules } from "../../constants";
import { AuthService } from "./hooks/authService";
import { SERVICE_ERROR_MESSAGE, SERVICE_SUCCESS_MESSAGE } from "../../message";

interface IForm {
  email: string;
}

function ResetInputEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (data: IForm) => {
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await AuthService.sendPasswordResetEmail(data.email);
      setMessage(SERVICE_SUCCESS_MESSAGE.SEND_PASSWORD_RESET_LINK);
    } catch (e) {
      if (e && typeof e === "object" && "message" in e) {
        setError(String(e.message));
      } else {
        setError(SERVICE_ERROR_MESSAGE.UNDEFINED_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <Title>비밀번호 찾기</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          name="email"
          placeholder="이메일"
          type="email"
          error={errors.email}
          rules={validationRules.email}
          setValue={setValue}
          watch={watch}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "전송 중..." : "재설정 링크 보내기"}
        </Button>
      </Form>
      {error && <Error>{error}</Error>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <Switcher>
        <Link to="/login">로그인</Link>
      </Switcher>
    </AuthWrapper>
  );
}

export default ResetInputEmail;
