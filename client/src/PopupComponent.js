import styled from "styled-components";
import moment from "moment";

const PopupComponent = ({
  selectedCrossing,
  currentReport,
  reportPolice,
  reportPoliceGone,
  reportOpen,
  reportClosed,
  setSelectedCrossing,
}) => {
  return (
    <>
      <StyledInfo>
        <h2>{selectedCrossing.name}</h2>
        <StyleCloseBut onClick={() => setSelectedCrossing(null)}>
          x
        </StyleCloseBut>
        <div>
          {selectedCrossing.open ? (
            <div>
              <p>Crossing currently open</p>
              <button onClick={() => reportClosed(selectedCrossing._id)}>
                Report Closed
              </button>
            </div>
          ) : (
            <div>
              <p>Crossing currently closed</p>
              <button onClick={() => reportOpen(selectedCrossing._id)}>
                Report Open
              </button>
            </div>
          )}
          {selectedCrossing.legalCrossing ? (
            <p>This is a legal crossing</p>
          ) : selectedCrossing.police && !selectedCrossing.legalCrossing ? (
            <div>
              {currentReport ? (
                <p>
                  Police last reported{" "}
                  {moment(currentReport.timeStamp).format("H:mm • MMM Do YYYY")}
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
              <p>Police currently not reported.</p>
              <button onClick={() => reportPolice(selectedCrossing._id)}>
                Report Police
              </button>
              {currentReport ? (
                <p>
                  Police last reported{" "}
                  {moment(currentReport.timeStamp).format("H:mm • D MMM YY")}
                </p>
              ) : (
                <p>Police never reported</p>
              )}
            </div>
          )}
        </div>
      </StyledInfo>
    </>
  );
};

const StyleCloseBut = styled.button`
  position: absolute;
  z-index: 2;
  right: 15px;
  top: 15px;
  font-size: 1.3rem;
`;

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
