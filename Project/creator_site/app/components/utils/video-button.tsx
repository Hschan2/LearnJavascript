"use client";

import { IButtonProps } from "@/app/types/buttonType";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

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
        className={`transition relative ${size} overflow-hidden rounded-2xl text-gray-200 opacity-80 border border-inherit hover:opacity-100`}
      >
        <Image
          src={image}
          alt="Image Button"
          loading="lazy"
          quality={75}
          fill
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
          ▶️
        </span>
      </button>
      {title ? <p className="text-xs my-1.5 ml-1.5">{title}</p> : null}
      <Modal isOpen={isModalOpen} onClose={closeModal} videoUrl={url} />
    </div>
  );
}

export default VideoButton;
