"use client";

import React, { useState } from "react";
import { IButtonProps } from "../../type/Types";
import Modal from "../common/Modal";

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
        className={`transition ${size} bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-black`}
      >
        ▶️
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default VideoButton;
