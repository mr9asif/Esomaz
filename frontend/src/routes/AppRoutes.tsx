import { Route, Routes } from "react-router-dom";

import Profile from "../features/profile/Profile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ProfilePage from "../features/profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
  path="/profile/:username"
  element={<ProfilePage />}
/>
    </Routes>
  );
}