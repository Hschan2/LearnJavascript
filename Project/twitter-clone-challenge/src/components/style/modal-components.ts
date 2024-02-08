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
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  position: relative;
  min-width: 600px;
  mim-height: 600px;
  max-width: 600px;
  max-height: 600px;
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
  color: black;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 100%;
`;
