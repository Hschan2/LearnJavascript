import { styled } from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 16px;
  position: relative;
  min-width: clamp(250px, 50vw, 600px);
  mim-height: clamp(250px, 50vw, 600px);
  max-width: clamp(250px, 50vw, 600px);
  max-height: clamp(250px, 50vw, 600px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalCloseButton = styled.button`
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  border: none;
  color: #FFF;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 100%;
`;
