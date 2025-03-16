import { FaFacebook, FaLinkedinIn, FaLine } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SiGmail, SiKakaotalk, SiNaver } from "react-icons/si";
import useKakaoInit from "../../../shared/hook/useKakaoInit";
import {
  ShareButtonWrapper,
  ShareCloseButton,
  ShareCopyButton,
  ShareModalContent,
  ShareModalOverlay,
  ShareModalTitle,
  ShareShareButton,
} from "../styles/modal-components";
import { ShareModalProps } from "../types/modal-type";

const ShareModal = ({ open, setOpen, title, image }: ShareModalProps) => {
  useKakaoInit();

  const currentURL = window.location.href;
  const encodedUrl = encodeURIComponent(currentURL);
  const encodedText = encodeURIComponent(title!);
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
    naver: `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedText}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodedText}&body=${encodedUrl}`,
    email: `mailto:?subject=${encodedText}&body=${encodedUrl}`,
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert("Kakao SDK가 로드되지 않아 공유할 수 없습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title || "카카오 공유",
        description: `${title}을 확인해보세요!`,
        imageUrl: image || "",
        link: {
          mobileWebUrl: currentURL,
          webUrl: currentURL,
        },
      },
    });
  };

  const handleURLCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      alert("URL이 복사되었습니다!");
    } catch (error) {
      console.error("URL 복사 실패", error);
    }
  };

  if (!open) return null;

  return (
    <ShareModalOverlay onClick={() => setOpen(false)}>
      <ShareModalContent onClick={(e) => e.stopPropagation()}>
        <ShareModalTitle>공유하기</ShareModalTitle>
        <ShareButtonWrapper>
          <ShareShareButton onClick={handleKakaoShare} className="kakao">
            <SiKakaotalk size={24} color="#fff" />
          </ShareShareButton>
          <ShareShareButton
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <FaFacebook size={24} color="#fff" />
          </ShareShareButton>
          <ShareShareButton
            href={shareLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
          >
            <FaTwitter size={24} color="#fff" />
          </ShareShareButton>
          <ShareShareButton
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <FaLinkedinIn size={24} color="#fff" />
          </ShareShareButton>
          <ShareShareButton
            href={shareLinks.naver}
            target="_blank"
            rel="noopener noreferrer"
            className="naver"
          >
            <SiNaver size={24} color="#fff" />
          </ShareShareButton>
          <ShareShareButton
            href={shareLinks.line}
            target="_blank"
            rel="noopener noreferrer"
            className="line"
          >
            <FaLine size={24} color="#fff" />
          </ShareShareButton>
          <ShareShareButton
            href={shareLinks.gmail}
            target="_blank"
            rel="noopener noreferrer"
            className="gmail"
          >
            <SiGmail size={24} color="#fff" />
          </ShareShareButton>
          <ShareShareButton
            href={shareLinks.email}
            target="_blank"
            rel="noopener noreferrer"
            className="email"
          >
            <MdEmail size={24} color="#fff" />
          </ShareShareButton>
        </ShareButtonWrapper>
        <ShareButtonWrapper className="UrlWrapper">
          <ShareCopyButton className="url" aria-disabled="true">
            {currentURL}
          </ShareCopyButton>
          <ShareCopyButton onClick={handleURLCopy} className="copy">
            URL 복사
          </ShareCopyButton>
        </ShareButtonWrapper>
        <ShareCloseButton onClick={() => setOpen(false)}>닫기</ShareCloseButton>
      </ShareModalContent>
    </ShareModalOverlay>
  );
};

export default ShareModal;
