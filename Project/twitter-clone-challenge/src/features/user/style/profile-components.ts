import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: min(10px, 2%);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: min(20px, 4%);
  padding: min(40px, 5%) 0;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const AvatarUpload = styled.label`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
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
  gap: min(8px, 2%);
`;

export const Input = styled.input`
  padding: min(5px, 1%) min(10px, 2%);
  border-radius: 50px;
  border: 1px solid #797979;
  width: 100%;
  font-size: clamp(12px, 2vw, 14px);
`;

export const Name = styled.span`
  font-size: clamp(18px, 2.5vw, 22px);
`;

export const Tweets = styled.div`
  width: 100%;
  display: grid;
  gap: min(10px, 2%);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

  // grid-template-columns: repeat(3, 1fr);

  // @media (max-width: 768px) {
  //   grid-template-columns: repeat(2, 1fr);
  // }

  // @media (max-width: 425px) {
  //   grid-template-columns: 1fr;
  // }
`;

export const EditButton = styled.button`
  width: 70px;
  height: 30px;
  margin-top: 10px;
  font-size: clamp(12px, 2vw, 14px);
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
  font-size: clamp(12px, 2vw, 14px);
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
  width: min(200px, 80%);
  height: 40px;
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
  cursor: pointer;

  &:first-child {
    border-right: 1px solid #d3d3d3;
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
  font-size: clamp(16px, 2vw, 18px);
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.text : theme.lightText};
`;

// Modal
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  width: min(320px, 80%);
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const Title = styled.h2`
  font-size: clamp(16px, 2vw, 18px);
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: clamp(14px, 2vw, 18px);
  cursor: pointer;
  color: #555;
`;

export const FollowList = styled.ul`
  list-style: none;
  padding: 0;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
`;

export const FollowItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;
