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
        className={`transition relative ${size} overflow-hidden rounded-2xl text-slate-900 hover:text-slate-300`}
      >
        <Image
          src={image}
          alt="Image Button"
          loading="lazy"
          layout="fill"
          objectFit="cover"
          className="transition opacity-60 hover:opacity-100"
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
          ▶️
        </span>
      </button>
      {title ? <p className="text-xs my-1.5">{title}</p> : null}
      <Modal isOpen={isModalOpen} onClose={closeModal} videoUrl={url} />
    </div>
  );
}

export default VideoButton;
