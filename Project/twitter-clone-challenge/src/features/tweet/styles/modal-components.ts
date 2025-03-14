import { styled } from "styled-components";

// Normal-Modal Style
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: min(10px, 2%);
`;

export const ModalContent = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 16px;
  width: clamp(250px, 50vw, 600px);
  height: clamp(250px, 50vh, 600px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: min(12px, 3%);
  overflow: hidden;
`;

export const ModalTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h2`
  font-weight: 600;
  font-size: clamp(1.8rem, 2vw, 2rem);
`;

export const ModalInputBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: min(4px, 1%);
  margin-top: min(16px, 3%);
`;

export const ModalInput = styled.input`
  width: 80%;
  padding: min(6px, 1%) min(8px, 2%);
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
`;

export const ModalButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: min(6px, 2%);
  cursor: pointer;
  text-align: center;

  svg {
    width: clamp(1.2rem, 2vw, 1.4rem);
    height: clamp(1.2rem, 2vw, 1.4rem);
    color: ${(props) => props.theme.text};
  }
`;

export const ModalUl = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: min(10px, 2%);
  overflow-y: auto;
  max-height: clamp(200px, 50vh, 50vh);

  @media (max-width: 425px) {
    max-height: 40vh;
  }
`;

export const ModalLi = styled.li`
  padding: min(10px, 2%);
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: ${(props) => props.theme.lightText};
  }
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  padding: min(6px, 2%) min(8px, 3%);
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

// Share-Modal Style
export const ShareModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ShareModalContent = styled.div`
  background: white;
  padding: min(20px, 5%);
  border-radius: 10px;
  width: clamp(250px, 50vw, 400px);
  text-align: center;
`;

export const ShareModalTitle = styled.h2`
  padding: min(16px, 4%);
  font-size: clamp(1.8rem, 2vw, 2rem);
`;

export const ShareButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: min(8px, 2%);
  flex-wrap: wrap;
`;

export const ShareShareButton = styled.a`
  display: block;
  width: 100%;
  margin-top: min(10px, 2%);
  padding: min(10px, 2%);
  cursor: pointer;
  border-radius: 50%;
  font-size: clamp(1rem, 2vw, 1.2rem);
  text-decoration: none;

  &.kakao {
    background: #fee500;
  }

  &.facebook {
    background: #1877f2;
  }

  &.twitter {
    background: #08a0e9;
  }

  &.linkedin {
    background: #0072b1;
  }

  &.naver {
    background: #03c75a;
  }

  &.line {
    background: #06c755;
  }

  &.gmail {
    background: #d14836;
  }

  &.email {
    background: #333;
  }
`;

export const ShareCopyButton = styled.a`
  display: block;
  width: 100%;
  margin-top: min(24px, 5%);
  padding: min(10px, 2%);
  border-radius: 50px;
  color: #fff;
  text-decoration: none;

  &.copy {
    background: #0d6efd;
    font-size: 14px;
    cursor: pointer;
  }

  &.url {
    background: #767676;
    color: #d3d3d3;
    font-size: 12px;
    pointer-events: none;
  }
`;

export const ShareCloseButton = styled.button`
  margin-top: min(16px, 4%);
  padding: min(5px, 2%) min(10px, 3%);
  background: #808080;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;