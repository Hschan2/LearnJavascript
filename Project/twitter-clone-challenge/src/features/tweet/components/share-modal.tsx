import { styled } from "styled-components";

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
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  text-decoration: none;

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

  &.copy {
    background: #767676;
    font-size: 14px;
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
  background: #767676;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

interface ShareModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | undefined;
}

const ShareModal = ({ open, setOpen, title }: ShareModalProps) => {
  const currentURL = window.location.href;
  const encodedUrl = encodeURIComponent(currentURL);
  const encodedText = encodeURIComponent(title!);
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
    naver: `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedText}`,
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
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            Facebook
          </ShareButton>
          <ShareButton
            href={shareLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
          >
            Twitter
          </ShareButton>
          <ShareButton
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            LinkedIn
          </ShareButton>
          <ShareButton
            href={shareLinks.naver}
            target="_blank"
            rel="noopener noreferrer"
            className="naver"
          >
            Naver
          </ShareButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <ShareButton className="url" aria-disabled="true">
            {currentURL}
          </ShareButton>
          <ShareButton onClick={handleURLCopy} className="copy">
            URL 복사
          </ShareButton>
        </ButtonWrapper>
        <CloseButton onClick={() => setOpen(false)}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ShareModal;
