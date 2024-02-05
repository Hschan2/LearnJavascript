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
