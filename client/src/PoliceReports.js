import styled from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment";

const PoliceReports = () => {
  const [policeReport, setPoliceReport] = useState(null);

  useEffect(() => {
    fetch("/get-police-reports")
      .then((res) => res.json())
      .then((data) => {
        setPoliceReport(data.data.reverse());
      });
  }, []);

let crossingArr = [];
  if (!policeReport) {
    return <h1>Loading!</h1>;
  }
  return (
    <StyledReports>
      <h1>Police Reports</h1>
      <StyledNameCols>
        {policeReport.forEach((report) => {
          if (!crossingArr.includes(report.crossingName)) {
            crossingArr.push(report.crossingName);
            console.log(crossingArr);
          }
        })}

        {crossingArr.map((name)=>{
          return (
            <div key={name}>
              <h3>{name}</h3>
              {policeReport.map((report) => {
                if (report.crossingName === name) {
                  return (
                    <div key={report.timeStamp}>
                      {moment(report.timeStamp).format("H:mm • MMM Do YYYY")}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </StyledNameCols>
    </StyledReports>
  );
};

const StyledReports = styled.div`
  margin: 200px;
  @media (max-width: 798px) {
    margin: 120px 0 0 10px;
  }
`;
const StyledNameCols = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    margin-right: 20px;
  }
`;
export default PoliceReports;
