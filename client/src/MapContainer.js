import ReactMapBox, { Marker, GeolocateControl } from "react-map-gl";
import styled from "styled-components";
import { useEffect, useState } from "react";
import go from "./assets/pedestrian.png";
import stop from "./assets/forbidden.png";
import police from "./assets/policeman.png";
import PopupComponent from "./PopupComponent";

const MapContainer = () => {
  const { REACT_APP_MAPBOX_TOKEN } = window.__RUNTIME_CONFIG__;
  const [crossings, setCrossings] = useState(null);
  const [selectedCrossing, setSelectedCrossing] = useState(null);
  const [refreshMap, setRefreshMap] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get-crossing`)
      .then((res) => res.json())
      .then((data) => {
        setCrossings(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get-police-reports`)
      .then((res) => res.json())
      .then((data) => {
        let reportArray = [];
        selectedCrossing &&
          data.data.forEach((report) => {
            if (selectedCrossing.name === report.crossingName) {
              reportArray.push(report);
            }
          });
        setCurrentReport(reportArray[reportArray.length - 1]);
      });
  }, [selectedCrossing]);

  const reportPolice = (_id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/report-police`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshMap(!refreshMap);
      });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/police-ts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefreshMap(!refreshMap);
      });
  };

  const reportPoliceGone = (_id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/report-police-gone`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedCrossing({
          ...selectedCrossing,
          [selectedCrossing.result.police]: false,
        });
        setRefreshMap(!refreshMap);
      });
  };

  const rightClick = () => {
    setSelectedCrossing(null);
  };

  if (!crossings) {
    return <h1>Loading</h1>;
  }
  return (
    <StyledMap>
      <ReactMapBox
        initialViewState={{
          longitude: -73.599382,
          latitude: 45.52886,
          zoom: 14,
        }}
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/alltherighthype/claviciik000914s952oab0f5"}
        onContextMenu={rightClick}
      >
        <GeolocateControl showAccuracyCircle={false} />
        {crossings.map((each) => {
          return (
            <Marker
              latitude={each.result.latitude}
              longitude={each.result.longitude}
              key={each._id}
            >
              <StyledIconDiv>
                {each.result.open === true ? (
                  <img src={go} alt="this crossing is currently open" />
                ) : (
                  <img src={stop} alt="this crossing is currently closed" />
                )}
                {
                  //make this reflect the current crossing also?
                }
                {each.result.police === true ? (
                  <img src={police} alt="this crossing has police reports" />
                ) : null}
              </StyledIconDiv>
              <StyledBut
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedCrossing({
                    name: each.result.name,
                    bike: each.result.bike,
                    open: each.result.open,
                    police: each.result.police,
                    _id: each._id,
                  });
                }}
              >
                {each.result.name}
              </StyledBut>
            </Marker>
          );
        })}
        {selectedCrossing && (
          <PopupComponent
            selectedCrossing={selectedCrossing}
            reportPolice={reportPolice}
            reportPoliceGone={reportPoliceGone}
            currentReport={currentReport}
          />
        )}
      </ReactMapBox>
    </StyledMap>
  );
};

const StyledMap = styled.div`
  margin-top: 100px;
  position: relative;
  height: 80vh;
  width: 80vw;
  @media (max-width: 1000px) {
    margin: auto;
    margin-top: 100px;
    width: 90vw;
  }
`;

const StyledBut = styled.button`
  background-color: black;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 10px;
`;

const StyledIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  img {
    width: 40px;
    bottom: 45px;
  }
`;

export default MapContainer;
