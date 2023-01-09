import styled from "styled-components";
const Footer = () => {
  return (
    <StyledFooter>
      DISCLAIMER: crossing train tracks is dangerous and illegal. This site is
      not encouraging commuters to cross train tracks. Be safe.
    </StyledFooter>
  );
};
const StyledFooter = styled.div`
  position: absolute;
  left: 2%;
  right: 0;
  bottom: 15px;
`;
export default Footer;
