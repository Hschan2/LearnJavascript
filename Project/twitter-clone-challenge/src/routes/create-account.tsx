import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Error,
  Form,
  Hint,
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

function CreateAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const { signUp, isLoading, error, clearError } = useAuth();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    clearError();
    if (await signUp(data.name, data.email, data.password)) {
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <Title>회원가입 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
}

export default CreateAccount;
