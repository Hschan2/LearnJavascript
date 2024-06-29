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

  @media (max-width: 425px) {
    min-width: 350px;
    mim-height: 350px;
    max-width: 350px;
    max-height: 350px;
  }

  @media (max-width: 375px) {
    min-width: 300px;
    mim-height: 300px;
    max-width: 300px;
    max-height: 300px;
  }

  @media (max-width: 320px) {
    min-width: 250px;
    mim-height: 250px;
    max-width: 250px;
    max-height: 250px;
  }
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
