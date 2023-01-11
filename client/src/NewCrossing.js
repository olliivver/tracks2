import styled from "styled-components";
import { useState } from "react";
import ReactMapBox, { Marker } from "react-map-gl";
import { useEffect } from "react";

const NewCrossing = () => {
  const { REACT_APP_MAPBOX_TOKEN } = window.__RUNTIME_CONFIG__;
  const [form, setForm] = useState({});
  const [crossings, setCrossings] = useState(null);

  useEffect(() => {
    fetch("/get-crossing")
      .then((res) => res.json())
      .then((data) => {
        setCrossings(data.data);
      });
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value, open: true, police: false });
    console.log(form)
  };

  const handleSubmit = () => {
    fetch(`/make-crossing`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form }),
    })
      .then((res) => res.json())
      .then((data) => {});
    console.log("submitted");
  };

  const handleClick = (e) => {
    e.preventDefault();
    const latInput = document.getElementById("latitude");
    const lngInput = document.getElementById("longitude");
    const latitude = e.lngLat.lat;
    const longitude = e.lngLat.lng;
    lngInput.value = longitude;
    latInput.value = latitude;
    setForm({ ...form, latitude: latitude, longitude:longitude });

  };

  if (!crossings) {
    return <h1>Loading</h1>;
  }
  return (
    <StyledForm>
      <p>
        Find your crossing on the map, and click on it to populate the location
        fields.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          type="text"
          placeholder="latitude"
          id="latitude"
          required
        ></input>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          type="text"
          id="longitude"
          placeholder="longitude"
          required
        ></input>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          placeholder="name your crossing"
          id="name"
          type="text"
          required
        ></input>
        <StyledRadio>
          <p>Is this crossing wide enough for a bicycle?</p>
          <label>Yes</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="name your crossing"
            name="bike"
            id="true"
            value={true}
            type="radio"
            required
          ></input>
          <label>No</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="name your crossing"
            id="false"
            value={false}
            name="bike"
            type="radio"
            required
          ></input>
        </StyledRadio>
        <StyledSubmit>Submit</StyledSubmit>
      </form>
      <ReactMapBox
        initialViewState={{
          longitude: -73.599382,
          latitude: 45.52886,
          zoom: 13,
        }}
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/alltherighthype/claviciik000914s952oab0f5"}
        onClick={(e) => handleClick(e)}
      >
        {crossings.map((each) => {
          return (
            <Marker
              latitude={each.result.latitude}
              longitude={each.result.longitude}
              key={each._id}
            >
              <StyledMarker>{each.result.name}</StyledMarker>
            </Marker>
          );
        })}
      </ReactMapBox>
    </StyledForm>
  );
};
const StyledSubmit = styled.button`
padding: 5px;
border: 2px solid white;
width: 35%;
margin: 5px auto;
`
const StyledRadio = styled.div`
  display:flex;
  justify-content: center;
  label{
    padding: 0 5px;
  }
  p{
    margin-right:20px;
  }
`;
const StyledMarker = styled.p`
  background-color: black;
  padding: 5px;
`;
const StyledForm = styled.div`
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  background-color: black;
  width: 700px;
  height: 500px;
  form {
    display: flex;
    flex-direction: column;
    input {
      background-color: black;
    }
    button {
      background-color: black;
      cursor: pointer;
    }
  }
`;

export default NewCrossing;
