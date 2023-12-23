import { IVideo } from "../type/VideoType";

const VIDEOS = {
  title: {
    portfolio: "포트폴리오",
    motionGraphic: "모션그래픽",
  },
  portfolio: {
    url: "portfolio-url",
  },
  motionGraphics: [
    { title: "모션그래픽 첫 번째", url: "motion-url-1" },
    { title: "모션그래픽 두 번째", url: "motion-url-2" },
    { title: "모션그래픽 세 번째", url: "motion-url-3" },
    { title: "모션그래픽 네 번째", url: "motion-url-4" },
  ] as IVideo[],
};

export default VIDEOS;