import { IModalProps } from "@/app/types/modalType";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Modal from "react-modal";

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
        className="bg-white shadow-lg border relative"
      >
        <button
          onClick={closeVideo}
          className="transition absolute top-2 right-2 w-6 h-6 bg-transparent font-bold text-slate-700 hover:text-black"
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
    <Modal
      isOpen={isOpen!}
      onRequestClose={closeVideo}
      contentLabel="Video"
      style={{
        content: {
          width: "820px",
          height: "530px",
          margin: "auto",
          border: "none",
          backgroundColor: "transparent",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5",
        },
      }}
    >
      {renderModalContent()}
    </Modal>
  );
}

export default ModalContainer;
