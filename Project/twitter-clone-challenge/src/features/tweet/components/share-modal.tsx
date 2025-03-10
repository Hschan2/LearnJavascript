import { FaFacebook, FaLinkedinIn, FaLine } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SiGmail, SiKakaotalk, SiNaver } from "react-icons/si";
import { styled } from "styled-components";
import useKakaoInit from "../../../shared/hook/useKakaoInit";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 250px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  padding: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ShareButton = styled.a`
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  text-decoration: none;

  &.kakao {
    background: #fee500;
  }

  &.facebook {
    background: #1877f2;
  }

  &.twitter {
    background: #08a0e9;
  }

  &.linkedin {
    background: #0072b1;
  }

  &.naver {
    background: #03c75a;
  }

  &.line {
    background: #06c755;
  }

  &.gmail {
    background: #d14836;
  }

  &.email {
    background: #333;
  }
`;

const CopyButton = styled.a`
  display: block;
  width: 100%;
  margin-top: 24px;
  padding: 10px;
  border-radius: 50px;
  color: #fff;
  text-decoration: none;

  &.copy {
    background: #0d6efd;
    font-size: 14px;
    cursor: pointer;
  }

  &.url {
    background: #767676;
    color: #d3d3d3;
    font-size: 12px;
    pointer-events: none;
  }
`;

const CloseButton = styled.button`
  margin-top: 16px;
  padding: 5px 10px;
  background: #808080;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

interface ShareModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | undefined;
  image: string | undefined;
}

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
    <ModalOverlay onClick={() => setOpen(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>공유하기</ModalTitle>
        <ButtonWrapper>
          <ShareButton
            onClick={handleKakaoShare}
            className="kakao"
          >
            <SiKakaotalk size={24} color="#fff" />
          </ShareButton>
          <ShareButton
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <FaFacebook size={24} color="#fff" />
          </ShareButton>
          <ShareButton
            href={shareLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
          >
            <FaTwitter size={24} color="#fff" />
          </ShareButton>
          <ShareButton
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <FaLinkedinIn size={24} color="#fff" />
          </ShareButton>
          <ShareButton
            href={shareLinks.naver}
            target="_blank"
            rel="noopener noreferrer"
            className="naver"
          >
            <SiNaver size={24} color="#fff" />
          </ShareButton>
          <ShareButton
            href={shareLinks.line}
            target="_blank"
            rel="noopener noreferrer"
            className="line"
          >
            <FaLine size={24} color="#fff" />
          </ShareButton>
          <ShareButton
            href={shareLinks.gmail}
            target="_blank"
            rel="noopener noreferrer"
            className="gmail"
          >
            <SiGmail size={24} color="#fff" />
          </ShareButton>
          <ShareButton
            href={shareLinks.email}
            target="_blank"
            rel="noopener noreferrer"
            className="email"
          >
            <MdEmail size={24} color="#fff" />
          </ShareButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <CopyButton className="url" aria-disabled="true">
            {currentURL}
          </CopyButton>
          <CopyButton onClick={handleURLCopy} className="copy">
            URL 복사
          </CopyButton>
        </ButtonWrapper>
        <CloseButton onClick={() => setOpen(false)}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ShareModal;
