"use client";

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
        <video width="100%" height="auto" controls autoPlay>
          <source src="/videos/Cinderella.mp4" type="video/mp4" />
        </video>
      </Modal>
    </div>
  );
}

export default VideoButton;
