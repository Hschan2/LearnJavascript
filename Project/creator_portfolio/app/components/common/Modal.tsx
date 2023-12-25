import React, { useEffect, useRef } from "react";
import { IModalProps } from "../../type/Types";
import VideoPlayer from "./VideoPlayer";

function Modal({ isOpen, onClose }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCancel = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      allClose();
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const allClose = () => {
    stopVideo();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleCancel);
    }

    return () => {
      document.removeEventListener("mousedown", handleCancel);
    };
  }, [isOpen, onClose]);

  const renderModalContent = () => {
    return (
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg border relative"
      >
        <button
          onClick={allClose}
          className="transition absolute top-2 right-2 w-6 h-6 bg-transparent text-sm text-slate-300 z-50 hover:text-white focus:outline-none"
        >
          X
        </button>
        {isOpen && (
          <VideoPlayer
            videoLink="/videos/Cinderella.mp4"
            videoRef={videoRef}
            isOpen={isOpen}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity ease-in-out duration-300`}
    >
      {renderModalContent()}
    </div>
  );
}

export default Modal;