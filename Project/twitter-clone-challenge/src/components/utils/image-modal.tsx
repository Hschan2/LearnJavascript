import { useEffect, useRef } from "react";
import { styled } from "styled-components";

interface ImageModalProps {
  onClose: () => void;
  imageUrl: string | undefined;
}

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  position: relative;
  max-width: 600px;
  max-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalCloseButton = styled.button`
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

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
`;

function ImageModal({ onClose, imageUrl }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  });

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalImage src={imageUrl} alt="Full Size Image" loading="lazy" />
      </ModalContent>
    </ModalOverlay>
  );
}

export default ImageModal;
