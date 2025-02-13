import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface MenuItemProps {
  active?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 80px;
  padding: 24px 0;

  svg {
    color: ${(props) => props.theme.text};
  }

  @media (max-width: 425px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
    height: 8vh;
    padding: 0;
  }
`;

export const WebMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;

  @media (max-width: 425px) {
    visibility: hidden;
    gap: 0;
    margin-top: 0;
  }
`;

export const MenuItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<MenuItemProps>`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  width: auto;
  opacity: ${({ active }) => (active ? 1 : 0.7)};

  svg {
    width: 30px;
  }
  &:hover {
    opacity: 1;
  }

  @media (max-width: 425px) {
    height: 15px;
  }
`;

export const NoneLineLink = styled(Link)`
  text-decoration: none;
`;

export const Logo = styled.span`
  svg {
    width: 80px;
    height: 40px;
    fill: none;
    color: tomato;
  }

  @media (max-width: 425px) {
    svg {
      width: 80px;
      height: 50px;
    }
  }
`;

export const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.border};
  object-fit: cover;
`;

export const FooterContainer = styled.footer`
  padding: 16px 0 16px 0;
  text-align: center;
  width: 100%;
  font-size: 12px;
  border-top: 1px solid #D3D3D3;
  color: #767676;
`;

// 상단 메뉴(모바일 버전)
export const MobileTopMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  visibility: hidden;

  @media (max-width: 425px) {
    visibility: visible;
  }
`;

// 하단 메뉴(모바일 버전)
export const BottomMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${(props) => props.theme.background};
  visibility: hidden;

  @media (max-width: 425px) {
    visibility: visible;
  }
`;

export const BottomMenuLink = styled(Link)<{ active?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  border: none;
  padding: 18px 0;
  gap: 4px;
  font-size: 12px;
  background-color: transparent;
  color: ${(props) => (props.active === "true" ? "#111111" : "#999999")};
  text-decoration: none;

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.active === "true" ? "#111111" : "#999999")};
  }
`;

// Slide
export const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0 40px 0;

  @media (max-width: 425px) {
    padding: 0 0 10px 0;

    .slick-dots li {
      margin: 0;
    }
  }
`;

export const SlideContent = styled.div`
  position: relative;
  width: 100%;
  height: 40vw;
  border: 1px solid #F1F5F7;
  border-radius: 12px;
  cursor: pointer;

  @media (max-width: 425px) {
    height: 50vw;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
  z-index: -1;
`;

// notification
export const NotificationBadge = styled.span`
  position: absolute;
  margin: -15px 0 0 15px;
  color: red;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;

  @media (max-width: 425px) {
    margin: -15px 0 0px 15px;
  }
`;
