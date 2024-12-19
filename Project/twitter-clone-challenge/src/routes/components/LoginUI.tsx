import { Link } from "react-router-dom";
import {
  Button,
  Error,
  Form,
  Switcher,
  Title,
  Wrapper,
} from "../../components/style/auth-components";
import { FormInput } from "../../components/utils/formInput";
import { validationRules } from "../../constants";
import GoogleButton from "../../components/btn/google-button";
import GithubButton from "../../components/btn/github-button";

type LoginUIProps = {
  onLoginSubmit: () => void;
  register: any;
  errors: any;
  isLoading: boolean;
  error: string | null;
};

export const LoginUI = ({
  onLoginSubmit,
  register,
  errors,
  isLoading,
  error,
}: LoginUIProps) => {
  return (
    <Wrapper>
      <Title>로그인 𝕏</Title>
      <Form onSubmit={onLoginSubmit}>
        <FormInput
          register={register}
          name="email"
          placeholder="이메일"
          type="email"
          error={errors.email}
          rules={validationRules.email}
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
      </Switcher>
      <GoogleButton />
      <GithubButton />
    </Wrapper>
  );
};
