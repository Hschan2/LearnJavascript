import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Error,
  Form,
  Input,
  PasswordMessage,
  Switcher,
  Title,
  Wrapper,
} from "../components/style/auth-components";
import GithubButton from "../components/btn/github-button";
import GoogleButton from "../components/btn/google-button";
import { emailRegex, passwordRegex } from "../constants";
import { useAuth } from "../hooks/useAuth";

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
  const { signUp, isLoading, error, clearError, trueLoading, falseLoading } =
    useAuth();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    clearError();

    if (
      isLoading ||
      data.name === "" ||
      data.email === "" ||
      data.password === ""
    ) {
      return;
    }

    try {
      trueLoading();
      const success = await signUp(data.name, data.email, data.password);
      if (success) {
        navigate("/");
      }
    } finally {
      falseLoading();
    }
  };

  return (
    <Wrapper>
      <Title>회원가입 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", {
            required: "이름을 입력해주세요.",
          })}
          placeholder="Name"
          type="text"
        />
        {errors?.name?.type === "required" && (
          <Error>이름을 입력해주세요.</Error>
        )}
        <Input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: emailRegex,
          })}
          placeholder="Email (ex. abc@gmail.com)"
          type="email"
        />
        {errors?.email?.type === "required" && (
          <Error>이메일을 입력해주세요.</Error>
        )}
        {errors?.email?.type === "pattern" && (
          <Error>이메일 양식에 맞게 입력해주세요.</Error>
        )}
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: passwordRegex,
          })}
          placeholder="Password (ex. abc123!@)"
          type="password"
        />
        <PasswordMessage>
          숫자, 대소문자 알파벳, 특수문자(!,@,#) 중 하나 이상의 총 8글자 이상
        </PasswordMessage>
        {errors?.password?.type === "required" && (
          <Error>비밀번호를 입력해주세요.</Error>
        )}
        {errors?.password?.type === "pattern" && (
          <Error>비밀번호 양식에 맞게 입력해주세요.</Error>
        )}
        <Input type="submit" value={isLoading ? "가입 중..." : "가입"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 이미 있으신가요? <Link to="/login">로그인</Link>
      </Switcher>
      <GoogleButton />
      <GithubButton />
    </Wrapper>
  );
}

export default CreateAccount;
