import styled from "styled-components";
import MapContainer from "./MapContainer";
import Legend from "./Legend";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      <StyledBg>
        <Legend />
        <MapContainer />
      </StyledBg>
    </>
  );
};

const StyledBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  @media (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`;

export default HomePage;
