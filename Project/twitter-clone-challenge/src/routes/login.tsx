import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Error,
  Form,
  Switcher,
  Title,
  Wrapper,
} from "../components/style/auth-components";
import GithubButton from "../components/btn/github-button";
import GoogleButton from "../components/btn/google-button";
import { useAuth } from "../hooks/auth/useAuth";
import { FormInput } from "../hooks/auth/formInput";
import { validationRules } from "../constants";

type FormType = {
  name: string;
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const { login, isLoading, error, clearError } = useAuth();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    clearError();
    if (await login(data.email, data.password)) {
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <Title>로그인 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
}

export default Login;
