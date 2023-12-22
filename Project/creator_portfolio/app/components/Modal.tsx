import React, { useEffect, useRef } from "react";
import { IModalProps } from "../type/Types";

function Modal({ isOpen, onClose, children }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCancel = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleCancel);
    }

    return () => {
      document.removeEventListener("mousedown", handleCancel);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity ease-in-out duration-300`}
    >
      <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 bg-transparent border rounded hover:border hover:border-gray-500 focus:outline-none"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
