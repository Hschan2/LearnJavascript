import { IModalProps } from "@/app/types/modalType";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

const VideoPlayer = dynamic(() => import("./video-player"), { ssr: false });

function ModalContainer({ isOpen, onClose, videoUrl }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCancel = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Node)) {
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
    document.addEventListener("click", handleCancel);

    return () => {
      document.removeEventListener("click", handleCancel);
    };
  }, [onClose, handleCancel]);

  const renderModalContent = () => {
    return (
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg border relative"
      >
        <button
          onClick={closeVideo}
          className="transition absolute top-2 right-2 w-6 h-6 bg-transparent font-bold text-slate-300 z-50 hover:text-white focus:outline-none"
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
    <>
      {createPortal(
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity ease-in-out duration-300`}
        >
          {renderModalContent()}
        </div>,
        document.body
      )}
    </>
  );
}

export default ModalContainer;
