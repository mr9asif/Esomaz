import { Route, Routes } from "react-router-dom";

import Profile from "../features/profile/Profile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Bookmarks from "@/features/post/components/Bookmark/Bookmark";
import PostDetails from "@/features/post/components/createPost/PostDetails";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "../features/profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmarks" element={<Bookmarks/>}></Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/messages" element={<ChatPage />} />
<Route
  path="/messages/:conversationId"
  element={<ChatPage />}
/>

<Route
  path="/post/:id"
  element={<PostDetails />}
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