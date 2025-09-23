import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!oobCode) {
      setError("유효하지 않은 접근입니다. 비밀번호 찾기를 다시 시도해주세요.");
    }
  }, [oobCode]);

  const onSubmit = async (data: IPasswordForm) => {
    if (!oobCode) {
      setError("유효하지 않은 요청입니다.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await AuthService.confirmPasswordReset(oobCode, data.password);
      setMessage("비밀번호가 성공적으로 변경되었습니다. 3초 후 로그인 페이지로 이동합니다.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!oobCode) {
    return (
      <AuthWrapper>
        <Title>오류</Title>
        <Error>{error}</Error>
        <Switcher>
          <Link to="/input-email">비밀번호 찾기</Link>
        </Switcher>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <Title>비밀번호 재설정</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          name="password"
          placeholder="새 비밀번호"
          type="password"
          error={errors.password}
          rules={validationRules.password}
        />
        <FormInput
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
        <Link to="/login">로그인 페이지로 이동</Link>
      </Switcher>
    </AuthWrapper>
  );
}

export default ResetPassword;