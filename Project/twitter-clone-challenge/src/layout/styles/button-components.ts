import { styled } from "styled-components";

export const Button = styled.span`
  background-color: white;
  font-weight: 600;
  width: 80%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.googleBtn {
    margin-top: 50px;
  }
`;

export const Logo = styled.img`
  height: 25px;
`;

export const ModeButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.border};
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 48px;

  svg {
    color: ${(props) => props.theme.text};
  }

  @media (max-width: 425px) {
    svg {
      width: 15px;
      height: 15px;
    }
    margin: 0 12px 0 0;
  }
`;
