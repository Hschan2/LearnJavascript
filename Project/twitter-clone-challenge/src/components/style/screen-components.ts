import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px 0px;
  width: 100%;
  max-width: 860px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.light};
  padding-bottom: 10px;

  svg {
    color: ${(props) => props.theme.text};
    fill: ${(props) => props.theme.text};
  }
`;

export const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const MenuItem = styled.div<{ active?: string }>`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  width: auto;
  opacity: ${(props) => (props.active === "true" ? "1" : "0.85")};

  svg {
    width: 25px;
  }
  &:hover {
    opacity: 1;
  }
`;

export const NoneLineLink = styled(Link)`
  text-decoration: none;
`;

export const MenuName = styled.span`
  color: ${(props) => props.theme.text};
  font-size: 16px;
`;

export const Logo = styled.span`
  svg {
    width: 50px;
    height: 50px;
    fill: none;
    color: tomato;
  }
`;

export const FooterContainer = styled.div`
  padding: 20px 0 20px 0;
  text-align: center;
  width: 100%;
  font-size: 12px;
  border-top: 1px solid grey;
`;
