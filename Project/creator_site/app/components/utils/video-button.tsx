"use client";

import { IButtonProps } from "@/app/types/buttonType";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("./modal"));

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
        className={`transition ${size} rounded-lg flex items-center justify-center text-gray-500 hover:text-black`}
        style={{
          backgroundImage: `url(${image})`,
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