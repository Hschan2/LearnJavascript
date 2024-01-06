"use client";

import React, { useState } from "react";
import { IButtonProps } from "../types/Types";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../common/Modal"));

function VideoButton({ size, data }: IButtonProps) {
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
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        ▶️
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} videoUrl={data.url} />
    </div>
  );
}

export default VideoButton;
