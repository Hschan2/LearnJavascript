import { Link } from "react-router-dom";
import {
  Button,
  Error,
  Form,
  Hint,
  Switcher,
  Title,
  Wrapper,
} from "../styles/auth-components";
import { FormInput } from "../../tweet/components/formInput";
import { validationRules } from "../../../constants";
import GoogleButton from "../google-button";
import GithubButton from "./github-button";

type LoginUIProps = {
  onCreateSubmit: () => void;
  register: any;
  errors: any;
  isLoading: boolean;
  error: string | null;
};

export const CreateAccountUI = ({
  onCreateSubmit,
  register,
  errors,
  isLoading,
  error,
}: LoginUIProps) => {
  return (
    <Wrapper>
      <Title>회원가입 𝕏</Title>
      <Form onSubmit={onCreateSubmit}>
        <FormInput
          register={register}
          name="name"
          placeholder="이름"
          type="text"
          error={errors.name}
          rules={validationRules.name}
        />
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
        <Hint>
          비밀번호는 8자 이상, 숫자, 소문자, 특수문자(!, @, #)를 포함해야
          합니다.
        </Hint>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "회원가입 중" : "회원가입"}
        </Button>
      </Form>
      {error && <Error className="error">{error}</Error>}
      <Switcher>
        계정이 이미 있으신가요? <Link to="/login">로그인</Link>
      </Switcher>
      <GoogleButton />
      <GithubButton />
    </Wrapper>
  );
};
