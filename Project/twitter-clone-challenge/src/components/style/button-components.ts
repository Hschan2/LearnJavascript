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

export const ModeButton = styled.button<{ darkMode?: boolean }>`
  width: 80px;
  height: 30px;
  font-size: 12px;
  color: ${(props) => (props.darkMode === true ? "black" : "white")};
  border: 1px solid ${(props) => (props.darkMode === true ? "black" : "white")};
  border-radius: 16px;
  background: transparent;
  cursor: pointer;
`