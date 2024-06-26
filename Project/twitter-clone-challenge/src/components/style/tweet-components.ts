import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid grey;
  border-radius: 15px;
  position: relative;
  max-width: 630px;

  svg {
    color: ${(props) => props.theme.text};
  }
`;

export const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 0 20px 12px;
`

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
    color: #FFF;
  }
`;

export const Photo = styled.img`
  width: 630px;
  height: 300px;
  border-radius: 15px;
  border: 1px solid grey;
  object-fit: cover;
  cursor: pointer;
`;

export const Username = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  font-size: 18px;

  svg {
    width: 15px;
    height: 15px;
    color: #1d9bf0;
  }
`;

export const Payload = styled.p`
  font-size: 16px;
`;

export const CreatedAt = styled.span`
  font-size: 12px;
  color: grey;
`;

export const LikeButton = styled.button`
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 20px;
  width: 80px;
  height: 40px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

export const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid grey;
`;
