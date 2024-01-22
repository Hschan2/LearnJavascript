"use client";

import { IButtonProps } from "@/app/types/buttonType";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("./modal"));

function VideoButton({ size, data }: IButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { image, url, title } = data;

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
        className={`relative ${size} overflow-hidden rounded-2xl`}
      >
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="Button Image"
          loading="lazy"
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
          ▶️
        </span>
      </button>
      {title ? <p className="text-xs my-1.5">{title}</p> : null}
      <Modal isOpen={isModalOpen} onClose={closeModal} videoUrl={url} />
    </div>
  );
}

export default VideoButton;
