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

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-right: 20px;
  padding: 0 40px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

export const MenuItem = styled.div<{ active?: boolean }>`
  padding: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  gap: 10px;
  opacity: ${(props) => (props.active ? "1" : "0.85")};
  svg {
    width: 30px;
    fill: white;
  }
  &:hover {
    opacity: 1;
  }
`;

export const NoneLineLink = styled(Link)`
  text-decoration: none;
`;

export const MenuName = styled.span`
  color: white;
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