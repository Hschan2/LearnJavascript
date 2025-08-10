import { useState } from "react";
import { Error, Title, Wrapper } from "./styles/auth-components";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { dataBase } from "../../firebase";
import { useNavigate } from "react-router";

const generateRandomCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const EXPIRATION_TIME_MS = 5 * 60 * 1000;

function InputEmail() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [verificationError, setVerificationError] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const code = generateRandomCode();
      const currentTime = Date.now();
      const expirationTime = currentTime + EXPIRATION_TIME_MS;

      await setDoc(doc(dataBase, "resetCodes", email), {
        code,
        createdAt: currentTime,
        expiresAt: expirationTime,
      });
      setStep(2);
    } catch (error) {
      setError("재설정 코드가 잘못됐습니다. 다시 시도해주세요.");
    }
  };

  const handleCodeVerification = async () => {
    try {
      const docRef = doc(dataBase, "resetCodes", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { code: storedCode, expiresAt } = docSnap.data();
        const currentTime = Date.now();

        if (currentTime > expiresAt) {
          setVerificationError(
            "재설정 코드가 만료되었습니다. 다시 요청해 주세요."
          );
        } else if (storedCode === code) {
          navigate("/reset-password");
        } else {
          setVerificationError("재설정 코드가 틀립니다. 다시 시도해 주세요.");
        }
      } else {
        setVerificationError(
          "이 이메일에 재설정 코드가 없습니다. 다시 시도해 주세요."
        );
      }
    } catch (error) {
      setVerificationError(
        "재설정 코드 인증에 실패했습니다. 다시 시도해 주세요."
      );
    }
  };

  return (
    <Wrapper>
      <Title>비밀번호 찾기 𝕏</Title>
      {step === 1 && (
        <div>
          <h2>이메일 입력</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            placeholder="이메일을 입력해 주세요."
          />
          <button onClick={handleEmailSubmit}>확인</button>
          {error && <Error>{error}</Error>}
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>재설정 코드 입력</h2>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              e.preventDefault();
              setCode(e.target.value);
            }}
            placeholder="재설정 코드를 입력해 주세요."
          />
          <button onClick={handleCodeVerification}>확인</button>
          {verificationError && <Error>{verificationError}</Error>}
        </div>
      )}
    </Wrapper>
  );
}

export default InputEmail;
