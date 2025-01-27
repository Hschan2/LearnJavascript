import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid grey;
  border-radius: 16px;
  position: relative;
  width: 100%;

  svg {
    color: ${(props) => props.theme.text};
  }
`;

export const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 8px 12px;
`;

export const Menu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const MenuItem = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;

  svg {
    width: 18px;
    height: 18px;
    color: #000;
    fill: #fff;
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 20vw;
  border-bottom: 1px solid #f1f1f7;
  border-radius: 14px;
  object-fit: cover;
  cursor: pointer;

  @media (max-width: 768px) {
    min-height: 250px;
  }

  @media (max-width: 375px) {
    min-height: 190px;
  }
`;

export const Username = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 14px;

  svg {
    width: 14px;
    height: 14px;
    color: #1d9bf0;
  }
`;

export const ProfileImage = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid grey;
`;

export const Payload = styled.p`
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
`;

export const CreatedAt = styled.span`
  font-size: 12px;
  color: #767676;
`;

export const TweetButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 4px 0 0 -8px;
`;

export const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  gap: 3px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  font-size: 14px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const LikeButton = styled(ButtonBase)`
  svg {
    color: #e73c37;
  }
`;

export const ExclamationButton = styled(ButtonBase)`
  svg {
    color: ${(props) => props.theme.text};
  }
`;

// Tags
export const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
`;

export const Tag = styled.span`
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 8px;
  font-size: 12px;
  color: #767676;
  padding: 4px 8px;

  &.detailTag {
    cursor: pointer;
  }
`;

// Detail
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px 0;
`;

export const DetailImage = styled.img`
  width: 100%;
  border-radius: 16px;
`;

export const DetailContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 8px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.light};
`;

export const DetailTweetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const DetailTitleButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const DetailEventButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

export const DetailEventButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;

  svg {
    width: 18px;
    height: 18px;
    color: #000;
    fill: #fff;
  }
`;

export const DetailTweetText = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(16px, 2vw, 32px);
  font-weight: 800;
  color: ${(props) => props.theme.text};

  svg {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const DetailButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DetailProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: clamp(12px, 1vw, 16px);
  color: ${(props) => props.theme.text};

  svg {
    width: 14px;
    height: 14px;
    color: #1d9bf0;
  }
`;

export const DetailInfo = styled.span`
  font-size: clamp(12px, 1vw, 16px);
  color: ${(props) => props.theme.lightText};
`;

export const DetailRetouch = styled.a`
  color: ${(props) => props.theme.text};
  font-size: clamp(12px, 1vw, 16px);
  padding: 4px 0;
`;

export const DetailCommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 12px 8px;
  margin-top: 20px;

  svg {
    width: 25px;
    height: 25px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
`;

export const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 4px;

  border-bottom: 1px solid ${(props) => props.theme.light};
`;

export const CommentProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;

export const CommentProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const CommentDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid red;
  border-radius: 6px;
  padding: 2px 6px;
  cursor: pointer;

  svg {
    width: 12px;
    height: 12px;
    color: ${(props) => props.theme.text};
  }
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentText = styled.p`
  font-size: clamp(12px, 2vw, 16px);
  color: ${(props) => props.theme.text};
`;

export const CommentCreatedTime = styled.span`
  font-size: 12px;
  color: #757575;
`;

export const FollowButton = styled.button`
  background-color: #ff6347;
  border: none;
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 12px;
  color: #fff;
`;
