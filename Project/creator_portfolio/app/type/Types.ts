import React from "react";

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