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
import SettingsPage from "./pages/Settings/SettingsPage";
import TransectList from "./pages/Region/TransectList";
import TransectDetail from "./pages/Region/TransectDetail";
import NotFound from "./pages/Error/NotFound";
import "./App.css";
import EditPreferences from "./pages/Settings/Edit/EditPreferences";
import GroupList from "./pages/Group/GroupList";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/region"
          element={
            <ProtectedRoute>
              <TransectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/region/transect/:id"
          element={
            <ProtectedRoute>
              <TransectDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group"
          element={
            <ProtectedRoute>
              <GroupList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group/create-group"
          element={
            <ProtectedRoute>
              <GroupForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group/:id"
          element={
            <ProtectedRoute>
              <GroupDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddTransect />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
