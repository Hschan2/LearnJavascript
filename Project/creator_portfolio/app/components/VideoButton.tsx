"use client"

import React, { useState } from "react";
import { IButtonProps } from "../type/Types";
import Modal from "./Modal";

function VideoButton({ size }: IButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className={`${size} bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-black`}
      >
        ▶️
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <iframe
          width="560"
          height="315"
          src="/public/videos/Cinderella.mp4"
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
}

export default VideoButton;
