import { Link } from "react-router-dom";
import {
  Button,
  Error,
  Hint,
  InputRow,
  Switcher,
  Title,
  VerifyButton,
  AuthWrapper,
} from "../styles/auth-components";
import { FormInput } from "../../../shared/components/form-input";
import { validationRules } from "../../../constants";
import GoogleButton from "./google-button";
import GithubButton from "./github-button";
import { AccountProps } from "../types/auth-type";

export const CreateAccountUI = ({
  register,
  errors,
  isLoading,
  error,
  onSendEmailCode,
  onVerifyEmailCode,
  onSignUp,
  isEmailVerified,
}: AccountProps) => {
  return (
    <AuthWrapper>
      <Title>회원가입</Title>
      <InputRow>
        <FormInput
          register={register}
          name="email"
          placeholder="이메일"
          type="email"
          error={errors.email}
          rules={validationRules.email}
        />
        <VerifyButton type="button" onClick={onSendEmailCode}>
          이메일 확인
        </VerifyButton>
      </InputRow>

      <InputRow>
        <FormInput
          register={register}
          name="code"
          placeholder="인증 코드"
          type="text"
          error={errors.code}
        />
        <VerifyButton type="button" onClick={onVerifyEmailCode}>
          코드 확인
        </VerifyButton>
      </InputRow>
      {isEmailVerified && <p style={{ color: "green" }}>인증 완료</p>}

      <InputRow>
        <FormInput
          register={register}
          name="name"
          placeholder="이름"
          type="text"
          error={errors.name}
          rules={validationRules.name}
        />
      </InputRow>

      <InputRow>
        <FormInput
          register={register}
          name="password"
          placeholder="비밀번호"
          type="password"
          error={errors.password}
          rules={validationRules.password}
        />
      </InputRow>

      <Hint>
        비밀번호는 8자 이상, 숫자, 소문자, 특수문자(!, @, #)를 포함해야 합니다.
      </Hint>
      <Button
        type="button"
        onClick={onSignUp}
        disabled={!isEmailVerified || isLoading}
      >
        {isLoading ? "회원가입 중" : "회원가입"}
      </Button>
      {error && <Error className="error">{error}</Error>}
      <Switcher>
        계정이 이미 있으신가요? <Link to="/login">로그인</Link>
      </Switcher>
      <GoogleButton />
      <GithubButton />
    </AuthWrapper>
  );
};
