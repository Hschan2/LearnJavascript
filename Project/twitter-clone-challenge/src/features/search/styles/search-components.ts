import { styled } from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px;
  width: 100%;
  gap: 24px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const InputSearch = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
  font-size: clamp(14px, 2vw, 16px);
`;

export const InputIcon = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  text-align: center;

  svg {
    width: clamp(18px, 2vw, 20px);
    height: clamp(18px, 2vw, 20px);
    color: ${(props) => props.theme.text};
  }
`;
