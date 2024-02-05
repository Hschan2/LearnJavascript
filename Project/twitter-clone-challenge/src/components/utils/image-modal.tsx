import { useEffect, useRef } from "react";
import { ImageModalProps } from "../types/util-type";
import { ModalCloseButton, ModalContent, ModalImage, ModalOverlay } from "../style/modal-components";

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
