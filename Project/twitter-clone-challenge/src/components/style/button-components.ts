import { styled } from "styled-components";

export const Button = styled.span`
  background-color: white;
  font-weight: 600;
  width: 80%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.githubBtn {
    margin-top: 10px;
  }
  &.googleBtn {
    margin-top: 50px;
  }
`;

export const Logo = styled.img`
  height: 25px;
`;

export const ModeButton = styled.button<{ dark?: string }>`
  width: 40px;
  height: 40px;
  border: 1px solid ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
  background: transparent;
  border-radius: 50%;
  margin-top: 50px;
  cursor: pointer;

  svg {
    color: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
  }
`;
