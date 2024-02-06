import { styled } from "styled-components";

const FooterContainer = styled.div`
  color: white;
  padding: 20px 0 20px 0;
  text-align: center;
  width: 100%;
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

function Footer() {
  return <FooterContainer>ⓒ 홍성찬</FooterContainer>;
}

export default Footer;
