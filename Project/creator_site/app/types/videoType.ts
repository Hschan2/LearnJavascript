import { RefObject } from "react";

export interface IVideo {
  title: string;
  url: string;
  image: string;
}

export interface ICategoriesProps {
  categories: IVideo[];
}

export interface IVideoTitle {
  children: React.ReactNode;
}

export interface IVideoPlayer {
  videoLink: string;
  videoRef: RefObject<HTMLVideoElement>;
  isOpen: boolean;
}
