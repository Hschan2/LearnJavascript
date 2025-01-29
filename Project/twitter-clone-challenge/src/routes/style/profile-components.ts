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

  @media (max-width: 425px) {
    width: 100%;
  }
`;

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
  border: 1px solid ${(props) => props.theme.light};
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
  border: 1px solid #797979;
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
`;

export const EditButton = styled.button`
  width: 70px;
  height: 30px;
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

export const FollowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 35px;
  border: 1px solid #767676;
  border-radius: 6px;
  overflow: hidden;
`;

export const FollowInformation = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  &:first-child {
    border-right: 1px solid #D3D3D3;
  }
`;

// 모바일 버전 프로필 메뉴
export const ProfileMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  visibility: hidden;

  @media (max-width: 425px) {
    visibility: visible;
  }
`;

export const ProfileMenu = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  height: 50px;
  background: none;
  border: ${({ $isSelected, theme }) =>
    $isSelected ? `1px solid ${theme.border}` : "none"};
  border-radius: 12px;
  font-size: 18px;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.text : theme.lightText};
`;
