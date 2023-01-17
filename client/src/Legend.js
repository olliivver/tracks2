import styled from "styled-components";
import { Link } from "react-router-dom";
import go from "./assets/pedestrian.png";
import stop from "./assets/forbidden.png";
import police from "./assets/policeman.png";

const Legend = () => {
  return (
    <StyledLegend>
      <h2>Legend</h2>
      <div>
        <StyledIcon src={go} />
        <p>Crossing Open</p>
      </div>
      <div>
        <StyledIcon src={stop} />
        <p>Crossing Closed</p>
      </div>
      <div>
        <StyledIcon src={police} />
        <p>Police Reported</p>
      </div>
      <StyledP>
        To see more details or make a report, click on a crossing
      </StyledP>
      <StyledP>
        For a history of police reports, click here:{" "}
        <Link to="/policereports">Police Reports</Link>
      </StyledP>
      <StyledP>
        To open a new crossing, click here:{" "}
        <Link to="/newcrossing">New Crossing</Link>
      </StyledP>
      <StyledP>
        For any comments or concerns, get in touch here:{" "}
        <Link to="/contact">Contact</Link>
      </StyledP>
      <StyledP>
        DISCLAIMER: crossing train tracks is dangerous and illegal. This site is
        not encouraging commuters to cross train tracks. Be safe.
      </StyledP>
    </StyledLegend>
  );
};

const StyledLegend = styled.div`
  margin: 100px 0 0 20px;
  width: 20%;
  div {
    display: flex;
    align-items: center;
  }
  @media (max-width: 1000px) {
    margin: 20px 0 0 20px;
    width: 90vw;
  }
`;
const StyledP = styled.p`
  margin: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid white;
`;
const StyledIcon = styled.img`
  width: 50px;
  margin: 5px;
`;

export default Legend;
