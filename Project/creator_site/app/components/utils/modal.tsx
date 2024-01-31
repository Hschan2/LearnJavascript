import { IModalProps } from "@/app/types/modalType";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./video-player"));

function Modal({ isOpen, onClose, videoUrl }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCancel = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeVideo();
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const closeVideo = () => {
    stopVideo();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleCancel);
      if (videoRef.current) {
        videoRef.current.focus();
      }
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
          onClick={closeVideo}
          className="transition absolute top-2 right-2 w-6 h-6 bg-transparent text-sm text-slate-300 z-50 hover:text-white focus:outline-none"
        >
          X
        </button>
        {isOpen && (
          <VideoPlayer
            videoLink={videoUrl}
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
        isOpen ? "opacity-100 visible z-50" : "opacity-0 invisible"
      } transition-opacity ease-in-out duration-300`}
    >
      {renderModalContent()}
    </div>
  );
}

export default Modal;
