import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 860px;
  gap: 10px;

  &.postForm {
    border-bottom: 1px solid grey;
    padding-bottom: 20px;
  }
  &.updateForm {
    border: 1px solid grey;
    border-radius: 26px;
    padding: 14px;
  }
`;

export const TextArea = styled.textarea`
  padding: 20px 10px 10px 10px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  overflow-y: hidden;

  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
  &.updateForm {
    border: 1px solid grey;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AttachFileButton = styled.label`
  align-self: flex-start;
  padding: 10px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  svg {
    width: 15px;
    height: 15px;
  }
`;

export const AttachFileInput = styled.input`
  align-self: flex-start;
  display: none;
`;

export const SubmitButton = styled.input`
  align-self: flex-start;
  margin-left: auto;
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export const EmojiButton = styled.button`
  align-self: flex-start;
  padding: 9px 10px;
  margin-left: 10px;
  color: #1d9bf0;
  background-color: transparent;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  svg {
    width: 15px;
    height: 15px;
  }
`;

export const ExistingPhotoContainer = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const ExistingPhoto = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 1px solid grey;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const DeletePhotoButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  outline: none;

  &:hover {
    background-color: #ff4d4h;
  }
`;

export const CancelButton = styled.button`
  align-self: flex-start;
  margin-left: 10px;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  padding: 10px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: ${(props) => props.theme.hover};
  }
`;

export const ButtonLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
`;
