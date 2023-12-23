import React, { useEffect, useRef } from "react";
import { IModalProps } from "../type/Types";

function Modal({ isOpen, onClose }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleCancel = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        stopVideo();
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

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity ease-in-out duration-300`}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg border relative"
      >
        <button
          onClick={() => {
            stopVideo();
            onClose();
          }}
          className="transition absolute top-2 right-2 w-6 h-6 bg-transparent text-sm text-slate-300 z-50 hover:text-white focus:outline-none"
        >
          X
        </button>
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          controls
          autoPlay={true}
        >
          <source src="/videos/Cinderella.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Modal;
