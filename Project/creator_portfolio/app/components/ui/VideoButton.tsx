"use client";

import React, { useState } from "react";
import { IButtonProps } from "../../type/Types";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../common/Modal"));

function VideoButton({ size, image }: IButtonProps) {
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
        className={`transition relative ${size} rounded-lg flex items-center justify-center text-gray-500 hover:text-black`}
      >
        <img
          src={image}
          alt="동영상 버튼"
          loading="lazy"
          className="w-full h-full object-cover rounded-lg z-10"
        />
        <span className="absolute z-20">▶️</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default VideoButton;
