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
          {...register("email", { required: "이메일을 입력해주세요." })}
          placeholder="Email"
          type="email"
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <Input
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          placeholder="Password"
          type="password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Input type="submit" value={isLoading ? "Loading..." : "로그인"} />
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
