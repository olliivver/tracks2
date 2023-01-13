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
  position: sticky;
  z-index: 1;
  left: 0;
  bottom: 0;
  background-color: black;
`;
export default Footer;
