import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { IPasswordForm } from "./types/auth-type";
import { SERVICE_ERROR_MESSAGE, SERVICE_SUCCESS_MESSAGE } from "../../message";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IPasswordForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get("oobCode");

  const onSubmit = async (data: IPasswordForm) => {
    if (!oobCode) {
      setError(SERVICE_ERROR_MESSAGE.FAILED_OOBCODE);
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError(SERVICE_ERROR_MESSAGE.DIFFERENT_PASSWORD);
      return;
    }
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await AuthService.confirmPasswordReset(oobCode, data.password);
      setMessage(SERVICE_SUCCESS_MESSAGE.CHANGE_PASSWORD);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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

  if (!oobCode) {
    return (
      <AuthWrapper>
        <Title>오류</Title>
        <Error>
          유효하지 않은 접근입니다. 비밀번호 찾기를 다시 시도해주세요.
        </Error>
        <Switcher>
          <Link to="/reset-input-email">비밀번호 찾기</Link>
        </Switcher>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <Title>비밀번호 재설정</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<IPasswordForm>
          register={register}
          name="password"
          placeholder="새 비밀번호"
          type="password"
          error={errors.password}
          rules={validationRules.password}
        />
        <FormInput<IPasswordForm>
          register={register}
          name="confirmPassword"
          placeholder="새 비밀번호 확인"
          type="password"
          error={errors.confirmPassword}
          rules={{
            ...validationRules.password,
            validate: (value) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다.",
          }}
        />
        <Button type="submit" disabled={isLoading || !!message}>
          {isLoading ? "변경 중..." : "비밀번호 변경"}
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

export default ResetPassword;
