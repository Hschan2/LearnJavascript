import { styled } from "styled-components";

// common-tweet-wrapper
export const TimelineWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }

  &.followUser-tweets {
    height: 50%;
  }
`;

// follow-style
export const FollowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: min(28px, 5%);
`;

export const UserAvatar = styled.img`
  max-width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  border: 1px solid #f1f5f5;
  border-radius: 50%;
`;

export const UserName = styled.span`
  font-size: clamp(1.8rem, 4vw, 2.25rem);
`;
