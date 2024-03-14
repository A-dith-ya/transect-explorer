import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import MapPage from "./pages/Map/MapPage";
import GroupForm from "./pages/Group/GroupForm";
import GroupDetail from "./pages/Group/GroupDetail";
import AddTransect from "./pages/AddTransect/AddTransect";
import NavBar from "./components/layout/navbar/NavBar";
import DrawingBar from "./components/map/DrawingBar";
import TransectList from "./pages/Region/TransectList";
import TransectDetail from "./pages/Region/TransectDetail";
import NotFound from "./pages/Error/NotFound";
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
        <Route path="/region" element={<TransectList />} />
        <Route path="/region/transect" element={<TransectDetail />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/group" element={<GroupList />} />
        <Route path="/group/create-group" element={<GroupForm />} />
        <Route path="/group/:id" element={<GroupDetail />} />
        <Route path="/add" element={<AddTransect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
