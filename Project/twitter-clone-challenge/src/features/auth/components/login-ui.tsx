import { Link } from "react-router-dom";
import {
  Button,
  Error,
  Form,
  Switcher,
  Title,
  AuthWrapper,
} from "../styles/auth-components";
import { FormInput } from "../../../shared/components/form-input";
import { validationRules } from "../../../constants";
import GoogleButton from "./google-button";
import GithubButton from "./github-button";
import { AccountProps } from "../types/auth-type";

export const LoginUI = ({
  onLoginSubmit,
  register,
  errors,
  isLoading,
  error,
  setValue,
  watch,
}: AccountProps) => {
  return (
    <AuthWrapper>
      <Title>로그인</Title>
      <Form onSubmit={onLoginSubmit}>
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
        <FormInput
          register={register}
          name="password"
          placeholder="비밀번호"
          type="password"
          error={errors.password}
          rules={validationRules.password}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중" : "로그인"}
        </Button>
      </Form>
      {error && <Error className="error">{error}</Error>}
      <Switcher>
        계정이 없으신가요? <Link to="/create-account">계정 생성</Link>
        {" | "}
        <Link to="/reset-input-email">비밀번호 찾기</Link>
      </Switcher>
      <GoogleButton />
      <GithubButton />
    </AuthWrapper>
  );
};
