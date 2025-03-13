import { styled } from "styled-components";

export const Wrapper = styled.div`
  // height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(420px, 90%);
  min-height: 90vh;
  padding: min(50px, 8%) 0px;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
`;

export const Form = styled.form`
  margin-top: min(50px, 5vh);
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: min(10px, 1vh);
  width: 100%;
`;

export const Input = styled.input`
  padding: clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px);
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  font-size: clamp(14px, 2vw, 16px);
  transition-duration: 0.5s;
  &[type="submit"] {
    margin-top: 10px;
    background-color: #2563eb;
    color: white;
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }
`;

export const Label = styled.label`
  display: none;
`;

export const Button = styled.button`
  padding: clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px);
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: clamp(14px, 2vw, 16px);
  transition-duration: 0.5s;
  margin-top: min(10px, 1vh);
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.85;
  }
`;

export const Error = styled.p`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: min(20px, 2vh);
  a {
    color: #1d9bf0;
  }
`;

export const PasswordMessage = styled.span`
  font-size: clamp(10px, 1.5vw, 12px);
  margin-top: 4px;
`;

export const Hint = styled.p`
  font-size: clamp(10px, 1.5vw, 12px);
  color: #888;
  margin-top: 5px;
  margin-bottom: min(15px, 2vh);
`;
