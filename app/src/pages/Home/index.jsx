import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import DrawingBar from "../../components/map/DrawingBar";
import UserButton from "../../components/user/UserButton";

const HomePage = () => {
  const position = [55, -122];
  return (
    <div>
      <MapContainer
        id="map"
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <DrawingBar></DrawingBar>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      {/* <LoginForm /> */}
      {/* <RegisterForm /> */}
      {/* <GroupForm /> */}
    </div>
  );
};

export default HomePage;
