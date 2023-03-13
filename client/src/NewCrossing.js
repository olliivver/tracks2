import styled from "styled-components";
import { useState } from "react";
import ReactMapBox, { Marker } from "react-map-gl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewCrossing = () => {
  const { REACT_APP_MAPBOX_TOKEN } = window.__RUNTIME_CONFIG__;
  const [form, setForm] = useState({});
  const [crossings, setCrossings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get-crossing`)
      .then((res) => res.json())
      .then((data) => {
        setCrossings(data.data);
      });
  }, []);
  const handleChange = (key, value) => {
    if (key === "legalCrossing") {
      value = (value === "true");
    }
    setForm({ ...form, [key]: value, open: true, police: false });
  };
//${process.env.REACT_APP_BACKEND_URL}
  const handleSubmit = () => {
    if (!form.latitude || !form.longitude) {
      alert("Please select a location on the map");
      return;
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/make-crossing`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form }),
    })
      .then((res) => res.json())
      .then((data) => {});
    navigate("/");
  };
  const handleClick = (e) => {
    e.preventDefault();
    setForm({ ...form, latitude: e.lngLat.lat, longitude: e.lngLat.lng });
  };

  if (!crossings) {
    return <h1>Loading</h1>;
  }
  return (
    <StyledForm>
      <p>Find your crossing on the map, and click on it.</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          placeholder="name your crossing"
          id="name"
          type="text"
          required
        ></input>
        <StyledRadio>
          <p>Is this a legal crossing?</p>
          <label>Yes</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            name="legalCrossing"
            id="true"
            value={true}
            type="radio"
            required
          ></input>
          <label>No</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            id="false"
            value={false}
            name="legalCrossing"
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
        {form.latitude && (
          <Marker latitude={form.latitude} longitude={form.longitude}></Marker>
        )}
      </ReactMapBox>
    </StyledForm>
  );
};
const StyledSubmit = styled.button`
  padding: 5px;
  border: 2px solid white;
  width: 35%;
  margin: 5px auto;
`;
const StyledRadio = styled.div`
  display: flex;
  justify-content: center;
  label {
    padding: 0 5px;
  }
  p {
    margin-right: 20px;
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
