import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Form,
  Error,
  Input,
  Title,
  AuthWrapper,
} from "./styles/auth-components";
import { FirebaseError } from "firebase/app";
import { SERVICE_ERROR_MESSAGE, SERVICE_SUCCESS_MESSAGE } from "../../message";

export default function ActionHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode) {
        setError(SERVICE_ERROR_MESSAGE.NOT_VERIFY_ACTION_CODE);
        setIsLoading(false);
        return;
      }
      try {
        await verifyPasswordResetCode(auth, oobCode);
        setIsValidCode(true);
      } catch (e) {
        if (e instanceof FirebaseError) {
          setError(e.message);
        } else {
          setError(SERVICE_ERROR_MESSAGE.UNDEFINED_ERROR);
        }
      } finally {
        setIsLoading(false);
      }
    };
    verifyCode();
  }, [oobCode]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!oobCode || newPassword === "") return;
    try {
      setIsLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      alert(SERVICE_SUCCESS_MESSAGE.RESET_PASSWORD);
      navigate("/login");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      } else {
        setError(SERVICE_ERROR_MESSAGE.UNDEFINED_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <AuthWrapper>로딩 중...</AuthWrapper>;
  }

  if (!isValidCode) {
    return (
      <AuthWrapper>
        <Title>오류</Title>
        <Error>{error || "유효하지 않은 비밀번호 재설정 링크입니다."}</Error>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <Title>비밀번호 재설정</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="password"
          value={newPassword}
          placeholder="새 비밀번호"
          type="password"
          required
        />
        <Input type="submit" value="비밀번호 변경" />
      </Form>
      {error && <Error>{error}</Error>}
    </AuthWrapper>
  );
}
