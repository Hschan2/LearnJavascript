import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid grey;
  border-radius: 15px;
  position: relative;
  width: 100%;

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
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 20px 12px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  width: 30vw;
  height: 20vw;
  border-radius: 15px;
  object-fit: cover;
  cursor: pointer;

  @media (max-width: 768px) {
    min-width: 300px;
    min-height: 250px;
  }

  @media (max-width: 375px) {
    min-width: 240px;
    min-height: 190px;
  }
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

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: transparent;
  border: none;
  width: 60px;
  height: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  font-size: 14px;

  svg {
    width: 25px;
    height: 25px;
    color: #E73C37;
  }
`;

export const ExclamationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: transparent;
  border: none;
  width: 60px;
  height: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  font-size: 14px;

  svg {
    width: 25px;
    height: 25px;
    color: #000;
  }
`;

export const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid grey;
`;
