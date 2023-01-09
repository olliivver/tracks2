import ReactMapBox, { Marker, GeolocateControl } from "react-map-gl";
import styled from "styled-components";
import { useEffect, useState } from "react";
import go from "./assets/pedestrian.png";
import stop from "./assets/forbidden.png";
import police from "./assets/policeman.png";

const MapContainer = () => {
  const [crossings, setCrossings] = useState(null);

  useEffect(() => {
    fetch("/get-crossing")
      .then((res) => res.json())
      .then((data) => {
        setCrossings(data.data);
        console.log(data.data);
      });
  }, []);

  useEffect(() => {
    fetch("/get-police-reports")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <StyledMap>
      <ReactMapBox
        initialViewState={{
          longitude: -73.599382,
          latitude: 45.52886,
          zoom: 14,
        }}
        mapboxAccessToken={
          "pk.eyJ1IjoiYWxsdGhlcmlnaHRoeXBlIiwiYSI6ImNsYXd1NWwzbDBqZmQzbmp1bmZ6NWVvMmQifQ.j40juR9qQyJdTkCOcXaLjg"
        }
        mapStyle={"mapbox://styles/alltherighthype/claviciik000914s952oab0f5"}
      >
        <GeolocateControl showAccuracyCircle={false} />
        {crossings &&
          crossings.map((each) => {
            <Marker
              latitude={each.result.latitude}
              longitude={each.result.longitude}
              key={each._id}
            >
              <div>
                <StyledIconDiv>
                  {each.result.open === true ? (
                    <img src={go} alt="this crossing is currently open" />
                  ) : (
                    <img src={stop} alt="this crossing is currently closed" />
                  )}
                  {each.result.police === true ? (
                    <img src={police} alt="this crossing has police reports" />
                  ) : null}
                </StyledIconDiv>
              </div>
            </Marker>;
          })}
      </ReactMapBox>
    </StyledMap>
  );
};

const StyledMap = styled.div`
  margin-top: 100px;
  height: 80vh;
  width: 80vw;
  @media (max-width: 1000px) {
    margin: auto;
    margin-top: 100px;
    width: 90vw;
  }
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
