import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;
