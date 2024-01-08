import { IVideo } from "../components/types/VideoType";

const VIDEOS = {
  title: {
    portfolio: "포트폴리오",
    motionGraphic: "모션그래픽",
    travel: "여행",
    shortForm: "숏폼",
  },
  portfolio: {
    url: "/videos/Cinderella.mp4",
    image: "/images/portfolio/png/portfolio.png",
  },
  motionGraphics: [
    {
      title: "Ball Slant",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/ball_slant.png",
    },
    {
      title: "[커버] 뽐뽐뽐",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/bbom_bbom_bbom_intro.png",
    },
    {
      title: "[커버] 빅히트 인트로",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/bithit_intro.png",
    },
    {
      title: "Cartoon Typography",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/cartoon_typography.png",
    },
    {
      title: "도시 애니메이션",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/city_animation.png",
    },
    {
      title: "[커버] 도라마코리아",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/dorama_korea.png",
    },
    {
      title: "닥터 스트레인지 포탈",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/dr_starange_portal.png",
    },
    {
      title: "[커버] 8비트 그래픽",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/eight_bit_intro.png",
    },
    {
      title: "얼굴 애니메이션",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/eyes_motion.png",
    },
    {
      title: "[커버] 가짜사나이 인트로",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/fake_mans_intro.png",
    },
    {
      title: "[커버] 프로미스나인 채널나인",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/fromis_nine_channel intro.png",
    },
    {
      title: "[커버] 프로미스나인 브이로그",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/fromis_nine_log_intro.png",
    },
    {
      title: "[커버] 프로미스나인 시즌",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/fromis_nine_season_intro.png",
    },
    {
      title: "[커버] 하바나나 광고",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/havanana_cover.png",
    },
    {
      title: "Hub 애니메이션",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/hud_motion.png",
    },
    {
      title: "[커버] 아이스크림 뮤비 인트로",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/ice_cream_intro.png",
    },
    {
      title: "[커버] 아이즈원 인트로",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/izone intro.png",
    },
    {
      title: "[커버] 아이즈원 아케이드",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/izone_acade_intro.png",
    },
    {
      title: "[커버] 라인 프렌즈",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/line_friends_cover.png",
    },
    {
      title: "선 모션그래픽",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/my_motion_graphic.png",
    },
    {
      title: "[커버] 이전 넷플릭스",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/netflix_before_intro.png",
    },
    {
      title: "[커버] 현재 넷플릭스",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/netflix_intro.png",
    },
    {
      title: "[커버] 핑크 다이어리",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/pinkdiary_cover.png",
    },
    {
      title: "[커버] 로켓펀치",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/rocket_punch_intro.png",
    },
    {
      title: "[커버] 네이버 시리즈",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/series_cover.png",
    },
    {
      title: "[커버] 스노우",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/snow_cover.png",
    },
    {
      title: "[커버] 오징어게임",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/squid_game_motion.png",
    },
    {
      title: "[커버] TvN",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/tvn_cover.png",
    },
    {
      title: "[커버] 발로란트",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/valorant_cover.png",
    },
    {
      title: "[커버] 울림 엔터테인먼트",
      url: "/videos/Cinderella.mp4",
      image: "/images/motionGraphic/png/woolim_intro.png",
    },
  ] as IVideo[],
  travel: [
    {
      title: "유럽",
      url: "/videos/Cinderella.mp4",
      image: "/images/travel/png/europe.png",
    },
    {
      title: "일본",
      url: "/videos/Cinderella.mp4",
      image: "/images/travel/png/japan.png",
    },
    {
      title: "가오슝",
      url: "/videos/Cinderella.mp4",
      image: "/images/travel/png/kaohsiung.png",
    },
    {
      title: "라오스",
      url: "/videos/Cinderella.mp4",
      image: "/images/travel/png/laos.png",
    },
  ] as IVideo[],
  shortForm: [
    {
      title: "강원도 원주",
      url: "/videos/Cinderella.mp4",
      image: "/images/shortForm/png/wonju.png",
    },
    {
      title: "일본 비에이",
      url: "/videos/Cinderella.mp4",
      image: "/images/shortForm/png/biei.png",
    },
    {
      title: "일본 홋카이도",
      url: "/videos/Cinderella.mp4",
      image: "/images/shortForm/png/hokkaido.png",
    },
    {
      title: "강원도 고석정",
      url: "/videos/Cinderella.mp4",
      image: "/images/shortForm/png/goseokjung.png",
    },
  ] as IVideo[],
};

export default VIDEOS;
