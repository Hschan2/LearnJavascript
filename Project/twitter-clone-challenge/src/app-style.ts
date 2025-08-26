import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Noto Sans KR', sans-serif;
    transition: 0.2s;
  }
  &.darkMode {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: 0.2s;
  }
`;

export const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  padding: 0 24px;

  @media (max-width: 425px) {
    padding: 0 12px;
  }
`;

export const lightTheme = {
  background: "#FFF",
  text: "#111111",
  lightText: "#767676",
  light: "rgba(0, 0, 0, 0.1)",
  border: "#111111",
  hover: "#FFFCFA",
};

export const darkTheme = {
  background: "#000",
  text: "#FAF8F6",
  lightText: "#C1C1C1",
  light: "rgba(255, 255, 255, 0.2)",
  border: "#FAF8F6",
  hover: "#111",
};
