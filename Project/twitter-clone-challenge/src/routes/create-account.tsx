import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";
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
} from "../components/auth-components";
import GithubButton from "../components/github-button";
import GoogleButton from "../components/google-button";
import { emailRegex, passwordRegex } from "../constants";

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
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setError("");
    if (
      isLoading ||
      data.name === "" ||
      data.email === "" ||
      data.password === ""
    )
      return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(credentials);
      await updateProfile(credentials.user, {
        displayName: data.name,
      });
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
        <PasswordMessage>숫자, 대소문자 알파벳, 특수문자(!,@,#) 중 하나 이상의 총 8글자 이상</PasswordMessage>
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
