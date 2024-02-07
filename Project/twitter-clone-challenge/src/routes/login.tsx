import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/style/auth-components";
import GithubButton from "../components/btn/github-button";
import GoogleButton from "../components/btn/google-button";
import { emailRegex, passwordRegex } from "../constants";
import { useAuth } from "../hooks/useAuth";

type FormType = {
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
  const { login, isLoading, error, clearError, trueLoading, falseLoading } =
    useAuth();

  const onSubmit = async ({ email, password }: FormType) => {
    clearError();

    if (isLoading || email === "" || password === "") {
      return;
    }

    try {
      trueLoading();
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    } finally {
      falseLoading();
    }
  };

  return (
    <Wrapper>
      <Title>로그인 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        {errors?.password?.type === "required" && (
          <Error>비밀번호를 입력해주세요.</Error>
        )}
        {errors?.password?.type === "pattern" && (
          <Error>비밀번호 양식에 맞게 입력해주세요.</Error>
        )}
        <Input type="submit" value={isLoading ? "로그인 중..." : "로그인"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요? <Link to="/create-account">계정 생성</Link>
      </Switcher>
      <GoogleButton />
      <GithubButton />
    </Wrapper>
  );
}

export default Login;
