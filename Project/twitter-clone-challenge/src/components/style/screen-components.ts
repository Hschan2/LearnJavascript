import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
`;

export const Menu = styled.div<{ dark: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-right: 20px;
  padding: 0 40px;
  border-right: 1px solid grey;

  svg {
    color: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
    fill: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
  }
`;

export const MenuItem = styled.div<{ active?: string }>`
  padding: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  width: 100px;
  gap: 10px;
  opacity: ${(props) => (props.active === "true" ? "1" : "0.85")};
  svg {
    width: 30px;
  }
  &:hover {
    opacity: 1;
  }
`;

export const NoneLineLink = styled(Link)`
  text-decoration: none;
`;

export const MenuName = styled.span<{ dark: string }>`
  color: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
  font-size: 14px;
`;

export const Logo = styled.span`
  svg {
    width: 100px;
    height: 100px;
    color: white;
    margin-bottom: 30px;
  }
`;

export const FooterContainer = styled.div`
  padding: 20px 0 20px 0;
  text-align: center;
  width: 100%;
  font-size: 12px;
  border-top: 1px solid grey;
`;
