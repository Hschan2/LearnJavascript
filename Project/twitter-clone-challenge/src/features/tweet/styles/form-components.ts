import { styled } from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: min(5em, 8%);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(80%, 600px);
  gap: clamp(8px, 2vw, 10px);

  &.comment {
    flex-direction: row;
  }
`;

export const TextArea = styled.textarea`
  padding: clamp(10px, 2vw, 12px) clamp(8px, 2vw, 10px);
  border-radius: clamp(8px, 2vw, 10px);
  border: 1px solid ${(props) => props.theme.light};
  font-size: clamp(14px, 1.5vw, 16px);
  width: 100%;
  resize: none;
  overflow-y: hidden;

  &::placeholder {
    font-size: clamp(12px, 1vw, 14px);
  }
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border};
  }
`;

// Button
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: clamp(8px, 2vw, 12px) 0;
`;

export const AttachFileButton = styled.label`
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d9bf0;
  border-radius: clamp(6px, 2vw, 8px);
  border: 1px solid #1d9bf0;
  cursor: pointer;
  svg {
    width: clamp(20px, 3vw, 25px);
    height: clamp(20px, 3vw, 25px);
  }
`;

export const AttachFileInput = styled.input`
  align-self: flex-start;
  display: none;
`;

export const RetouchWrapper = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const RetouchLabel = styled.label`
  width: 100%;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.light};
  cursor: pointer;

  svg {
    width: 12px;
    height: 12px;
    color: #008000;
  }
`;

export const SubmitButton = styled.input`
  align-self: flex-start;
  margin: 0 clamp(8px, 2vw, 10px) 0 auto;
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: clamp(8px, 2vw, 10px);
  border-radius: clamp(16px, 3vw, 20px);
  font-size: clamp(12px, 1.5vw, 14px);
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
  aspect-ratio: 1 / 1;
  border: 1px solid grey;
  border-radius: clamp(8px, 2vw, 10px);
  margin-bottom: clamp(8px, 2vw, 10px);
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
  margin-top: 8px;
`;

// Select Bar
export const SelectWrapper = styled.div`
  width: 80px;
  padding: 4px;
  margin-left: 8px;
`;

export const SelectToggleButton = styled.button`
  width: 100%;
  padding: 4px;
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 4px;
  background: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

export const SelectedOptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.light};
  border-radius: 4px;
`;

export const OptionButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  padding: 8px 0;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

// Image Preview
export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9
    object-fit: cover;
    border-radius: clamp(6px, 2vw, 8px);
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
  margin-top: 8px;
`;

export const TagsInput = styled.input`
  width: 100%;
  padding: clamp(4px, 1vw, 6px) clamp(4px, 1vw, 5px);
  border: 1px solid ${(props) => props.theme.light};
  border-radius: clamp(8px, 2vw, 10px);
  margin-bottom: clamp(4px, 1vw, 5px);

  &::placeholder {
    font-size: clamp(10px, 1vw, 12px);
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
  border: 1px solid #1d9bf0;
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
  color: #ff0000;
`;

// Retouch
export const RemoveRetouchButton = styled.button`
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 4px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  outline: none;

  &:hover {
    background-color: #ff4d4f;
  }
`;

// map
export const MapWrapper = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(2px, 1vw, 4px);
  padding: clamp(6px, 1vw, 10px) 0;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: clamp(16px, 2vw, 20px);
    height: clamp(16px, 2vw, 20px);
    color: ${(props) => props.theme.lightText};
  }
`

export const MapText = styled.span`
  color: ${(props) => props.theme.lightText};
`
