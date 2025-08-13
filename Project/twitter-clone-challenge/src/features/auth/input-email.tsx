import { useState } from "react";

function InputEmail({ onVerified }: { onVerified: () => void }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const sendCode = async () => {
    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(2);
      } else {
        setError(data.error);
      }
    } catch {
      setError("코드 발송 실패");
    }
  };

  const verifyCode = async () => {
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (data.success) {
        onVerified();
      } else {
        setError(data.error);
      }
    } catch {
      setError("코드 검증 실패");
    }
  };

  return (
    <div>
      {step === 1 && (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <button onClick={sendCode}>코드 보내기</button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증 코드"
          />
          <button onClick={verifyCode}>코드 확인</button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default InputEmail;
