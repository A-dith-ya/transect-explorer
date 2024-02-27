import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginForm from "./pages/Login/LoginForm";
import AuthLayout from "./components/layout/AuthLayout";
import RegisterForm from "./pages/Register/RegisterForm";
import "./App.css";
import UserLayout from "./components/layout/UserLayout";
import GroupForm from "./pages/Group/GroupForm";
import Group from "./pages/Group";
import GroupDetail from "./pages/Group/GroupDetail";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route path="create-group" element={<GroupForm />} />
          <Route path="group" element={<Group />} />
          <Route path="group/:id" element={<GroupDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
