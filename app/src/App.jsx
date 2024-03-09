import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import MapPage from "./pages/Map/MapPage";
import GroupForm from "./pages/Group/GroupForm";
import GroupDetail from "./pages/Group/GroupDetail";
import NavBar from "./components/layout/navbar/NavBar";
import DrawingBar from "./components/map/DrawingBar";
import "./App.css";
import GroupList from "./pages/Group/GroupList";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/group" element={<GroupList />} />
        <Route path="/group/create-group" element={<GroupForm />} />
        <Route path="/group/:id" element={<GroupDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
