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
} from "../components/auth-components";
import GithubButton from "../components/github-button";
import GoogleButton from "../components/google-button";
import { emailRegex, passwordRegex } from "../constants";

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
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormType) => {
    setError("");
    if (isLoading || data.email === "" || data.password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
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
          placeholder="Email"
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
          placeholder="Password"
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
