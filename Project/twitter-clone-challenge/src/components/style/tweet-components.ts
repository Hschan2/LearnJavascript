import { styled } from "styled-components";

export const Wrapper = styled.div<{ dark: string }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 15px;
  position: relative;

  svg {
    color: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
  }
`;

export const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
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
  }
`;

export const Photo = styled.img`
  width: 630px;
  height: 300px;
  border-radius: 15px;
  border: 1px solid grey;
  object-fit: cover;
  margin-top: 12px;
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
  margin: 10px 0px;
  font-size: 16px;
`;

export const CreatedAt = styled.span`
  margin-top: 10px;
  font-size: 12px;
  color: grey;
`;

export const LikeButton = styled.button<{ dark: string }>`
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 20px;
  width: 80px;
  height: 40px;
  margin-top: 20px;
  cursor: pointer;
  color: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
`;

export const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid grey;
`;
