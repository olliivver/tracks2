import styled from "styled-components";
import moment from "moment";

const PopupComponent = ({ selectedCrossing, policeReport, reportPolice, reportPoliceGone }) => {
  return (
    <>
      {console.log(selectedCrossing.name)}
      <StyledInfo>
        <h2>{selectedCrossing.name}</h2>
        <div>
          {selectedCrossing.open ? (
            <div>
              <p>Crossing currently open</p>
              <button>Report Closed</button>
            </div>
          ) : (
            <div>
              <p>Crossing currently closed</p>
              <button>Report Open</button>
            </div>
          )}
          {selectedCrossing.police === true ? (
            <div>
              {policeReport ? (
                <p>
                  Police last reported{" "}
                  {moment(policeReport.timeStamp).format("H:mm • MMM Do YYYY")}
                </p>
              ) : (
                <p>Police never reported</p>
              )}
              <button onClick={() => reportPoliceGone(selectedCrossing._id)}>
                Report Police Gone
              </button>
            </div>
          ) : (
            <div>
              <p>police currently not reported.</p>
              <button onClick={() => reportPolice(selectedCrossing._id)}>
                Report Police
              </button>
              {policeReport ? (
                <p>
                  {" "}
                  Police last reported{" "}
                  {moment(policeReport.timeStamp).format("H:mm • D MMM YY")}
                </p>
              ) : (
                <p>Police never reported</p>
              )}
            </div>
          )}
          {selectedCrossing.bike === "true" ? (
            <p>This crossing is wide enough for bicycles</p>
          ) : (
            <p>This crossing is too small for bicycles</p>
          )}
        </div>
      </StyledInfo>
    </>
  );
};

const StyledInfo = styled.div`
  /* display: ${(props) => (props.infoDiv ? "flex" : "none")}; */
  flex-direction: column;
  position: absolute;
  z-index: 1;
  width: 300px;
  padding: 20px;
  font-size: 1.1rem;
  background-color: black;
  p {
    border-top: 2px solid white;
    padding: 5px;
  }
  button {
    background-color: gray;
    cursor: pointer;
    padding: 5px;
  }
  h2 {
    padding: 3px;
  }
`;

export default PopupComponent;
