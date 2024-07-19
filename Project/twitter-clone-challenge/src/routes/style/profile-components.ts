import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 0;
`

export const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 50px;
  }
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarInput = styled.input`
  display: none;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const Input = styled.input`
  padding: 5px 10px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 14px;
`;

export const Name = styled.span`
  font-size: 22px;
`;

export const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

export const EditButton = styled.button`
  width: 50px;
  height: 25px;
  margin-top: 10px;
  font-size: 14px;
  background-color: #1d9bf0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const ConfirmEditButton = styled.button`
  width: 50px;
  height: 25px;
  margin-top: 10px;
  font-size: 14px;
  background-color: #111111;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  cursor: pointer;
`;
