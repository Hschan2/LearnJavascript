import React, { RefObject } from "react";

export interface IProjectTitle {
    children: React.ReactNode;
}

export interface IButtonProps {
    size: string
}

export interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface IVideoPlayer {
    videoLink: string;
    videoRef: RefObject<HTMLVideoElement>;
    isOpen: boolean;
}