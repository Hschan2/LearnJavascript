import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
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

function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials);
      await updateProfile(credentials.user, {
        displayName: name,
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
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "가입"} />
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
