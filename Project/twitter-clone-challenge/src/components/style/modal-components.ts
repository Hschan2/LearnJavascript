import { styled } from "styled-components";

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
  background-color: white;
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 16px;
  min-width: clamp(250px, 50vw, 600px);
  mim-height: clamp(250px, 50vw, 600px);
  max-width: clamp(250px, 50vw, 600px);
  max-height: clamp(250px, 50vw, 600px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
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

export const ModalInput = styled.input`
  width: 80%;
  margin-top: 8px;
  padding: 6px 8px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
`;

export const ModalUl = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

export const ModalLi = styled.li`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  cursor: pointer;
`;
