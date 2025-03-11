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
`;

export const ModalContent = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 16px;
  min-width: clamp(250px, 50vw, 600px);
  mim-height: clamp(250px, 50vw, 300px);
  max-width: clamp(250px, 50vw, 600px);
  max-height: 80vh;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
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
`;

export const ModalInputBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
`;

export const ModalInput = styled.input`
  width: 80%;
  padding: 6px 8px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
`;

export const ModalButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  text-align: center;

  svg {
    width: 14px;
    height: 14px;
    color: ${(props) => props.theme.text};
  }
`;

export const ModalUl = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  overflow-y: auto;
  max-height: 50vh;

  @media (max-width: 425px) {
    max-height: 40vh;
  }
`;

export const ModalLi = styled.li`
  padding: 10px;
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
  padding: 6px 8px;
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
  padding: 20px;
  border-radius: 10px;
  min-width: 250px;
  text-align: center;
`;

export const ShareModalTitle = styled.h2`
  padding: 16px;
`;

export const ShareButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ShareShareButton = styled.a`
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
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
  margin-top: 24px;
  padding: 10px;
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
  margin-top: 16px;
  padding: 5px 10px;
  background: #808080;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;