import { styled } from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 10px;

  &.updateForm {
    border: 1px solid grey;
    border-radius: 26px;
    padding: 14px;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 10px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.light};
  font-size: 16px;
  width: 100%;
  resize: none;
  overflow-y: hidden;

  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border};
  }
  &.updateForm {
    border: 1px solid grey;
  }
`;

// Button
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0;
`;

export const AttachFileButton = styled.label`
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d9bf0;
  border-radius: 8px;
  border: 1px solid #1d9bf0;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
  }
`;

export const AttachFileInput = styled.input`
  align-self: flex-start;
  display: none;
`;

export const SubmitButton = styled.input`
  align-self: flex-start;
  margin: 0 10px 0 auto;
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

// Image Preview
export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const RemoveImageButton = styled.button`
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
    background-color: #ff4d4f;
  }
`;

// Post-Tag
export const TagsInputWrapper = styled.div`
  margin-top: 4px;
`;

export const TagsInput = styled.input`
  width: 100%;
  padding: 6px 5px;
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 10px;
  margin-bottom: 5px;

  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border};
  }
`;

export const TagsList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Tag = styled.span`
  border: 1px solid #1D9BF0;
  border-radius: 8px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const RemoveTagButton = styled.button`
  background: none;
  border: none;
  margin-left: 4px;
  cursor: pointer;
  color: #FF0000;
`;
