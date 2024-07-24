import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

export const Menu = styled.div`
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
    max-width: 90%;
    padding: 0;
  }
`;

export const CenterMenuItem = styled.div`
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


export const MenuItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  width: auto;

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
`;

export const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.border};
  object-fit: cover;
`;

export const FooterContainer = styled.div`
  padding: 20px 0 20px 0;
  text-align: center;
  width: 100%;
  font-size: 12px;
  border-top: 1px solid grey;
`;

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
  padding: 12px 0;
  gap: 4px;
  font-size: 12px;
  background-color: transparent;
  color: ${(props) => (props.active === "true" ? "#111111" : "#999999")};
  text-decoration: none;

  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => (props.active === "true" ? "#111111" : "#999999")};
  }
`;

// Slide
export const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0 40px 0;
`;

export const SlideContent = styled.div<{ backgroundImage: string }>`
  position: relative;
  width: 100%;
  height: 40vw;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
`;

export const TextContent = styled.div`
  position: absolute;
  bottom: 50%;
  left: clamp(10px, 5vw, 40px);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Tweet = styled.h2`
  font-size: clamp(16px, 4vw, 32px);
`;

export const Username = styled.p`
  font-size: clamp(12px, 1vw, 14px);
  color: #c7c7c7;
`;
