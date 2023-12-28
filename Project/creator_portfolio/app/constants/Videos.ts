import { IVideo } from "../type/VideoType";

const VIDEOS = {
  title: {
    portfolio: "포트폴리오",
    motionGraphic: "모션그래픽",
    travel: "여행",
  },
  portfolio: {
    url: "/videos/Cinderella.mp4",
    image: "/images/paper-Cut-winter.png",
  },
  motionGraphics: [
    {
      title: "모션그래픽 첫 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
    {
      title: "모션그래픽 두 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
    {
      title: "모션그래픽 세 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
    {
      title: "모션그래픽 네 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
  ] as IVideo[],
  travel: [
    {
      title: "여행영상 첫 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
    {
      title: "여행영상 두 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
    {
      title: "여행영상 세 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
    {
      title: "여행영상 네 번째",
      url: "/videos/Cinderella.mp4",
      image: "/images/paper-Cut-winter.png",
    },
  ] as IVideo[],
};

export default VIDEOS;
