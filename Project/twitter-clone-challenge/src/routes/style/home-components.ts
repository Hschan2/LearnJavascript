import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 10px 0;
  margin: 0 auto;
  padding: 20px;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
`

export const FilterSelector = styled.select`
  padding: 4px 8px;
  border-radius: 8px;
`;
