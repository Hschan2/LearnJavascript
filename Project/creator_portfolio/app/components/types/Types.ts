import React, { RefObject } from "react";

export interface IProjectTitle {
    children: React.ReactNode;
}

export interface IButtonProps {
    size: string;
    data: {
        url: string;
        image: string;
    };
}

export interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

export interface IVideoPlayer {
    videoLink: string;
    videoRef: RefObject<HTMLVideoElement>;
    isOpen: boolean;
}