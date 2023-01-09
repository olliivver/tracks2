import styled from "styled-components";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <h1>tracks</h1>
      </Link>
      <h3>tracking crossings in mtl, qc</h3>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: black;
  height: 100px;
  width: 100%;
  position: absolute;
  top: 0;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #fff;
  h1 {
    font-size: 1.5rem;
  }
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

export default Header;
