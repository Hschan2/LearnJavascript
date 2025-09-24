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
      setMessage(
        "입력하신 이메일로 비밀번호 재설정 링크가 발송되었습니다. 이메일을 확인해주세요."
      );
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError(String(e.message));
      } else {
        setError("알 수 없는 에러가 발생했습니다.");
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
        로그인 페이지로 돌아가기 <Link to="/login">로그인</Link>
      </Switcher>
    </AuthWrapper>
  );
}

export default ResetInputEmail;