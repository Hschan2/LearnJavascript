import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: min(90%, 1200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 5vw, 30px);
  padding: min(20px, 5%);
  margin: 0 auto;

  @media (max-width: 425px) {
    width: 100%;
    margin: 0;
  }
`;

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: min(10px, 2%) 0;
`;

export const FilterSelector = styled.select`
  padding: clamp(4px, 1vw, 6px) clamp(4px, 2vw, 10px);
  border-radius: 8px;
`;

