import { CloseButton, Content, Header, ModalContainer, Overlay, Title } from "./styles/modal";
import { BaseModalProps } from "./types/modal";

const Modal = ({ isOpen, onClose, title, children }: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

