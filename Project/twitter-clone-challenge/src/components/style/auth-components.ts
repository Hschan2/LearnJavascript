import { styled } from "styled-components";

export const Wrapper = styled.div`
  // height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 420px;
  min-height: 90vh;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  font-size: 16px;
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

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  transition-duration: 0.5s;
  margin-top: 10px;
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
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export const PasswordMessage = styled.span`
  font-size: 12px;
  margin-top: 4px;
`;
