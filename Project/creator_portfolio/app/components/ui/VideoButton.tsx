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
        className={`transition ${size} rounded-lg flex items-center justify-center text-gray-500 hover:text-black`}
        style={{
          backgroundImage: `url('/images/paper-Cut-winter.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        ▶️
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default VideoButton;
