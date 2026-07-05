import { Route, Routes } from "react-router-dom";

import Profile from "../features/profile/Profile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import CommunityPage from "@/features/Communites/components/CommunityPage";
import ExplorePage from "@/features/Explore/ExplorePage";
import HelpPage from "@/features/Help/Components/HelpPage";
import Notifications from "@/features/notification/pages/Notification";
import Bookmarks from "@/features/post/components/Bookmark/Bookmark";
import PostDetails from "@/features/post/components/createPost/PostDetails";
import Post from "@/features/post/components/feed/Post";
import SearchPage from "@/features/search/components/SearchPage";
import SettingPage from "@/features/Setting/components/SettingPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "../features/profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={
        <ProtectedRoute>  <Home /></ProtectedRoute>
      
       } />
      <Route path="/bookmarks" element={  <ProtectedRoute>
            <Bookmarks></Bookmarks>
          </ProtectedRoute>}></Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
  path="/notifications"
  element={<Notifications />}
/>

      <Route path="/messages" element={   <ProtectedRoute>
    <ChatPage />
    </ProtectedRoute>} />
<Route
  path="/messages/:conversationId"
  element={
   <ProtectedRoute>
    <ChatPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/post/:id"
  element={<ProtectedRoute><PostDetails /></ProtectedRoute>}
/>

<Route 
 path="/search"
 element={<ProtectedRoute><SearchPage /></ProtectedRoute>}
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
  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
/>

<Route 
   path="/settings"
   element={
    <ProtectedRoute>

       <SettingPage/>
    </ProtectedRoute>
   }
/>

<Route 
  path="/communities"
  element={
    <ProtectedRoute>
      <CommunityPage/>
    </ProtectedRoute>
  }
/>

 <Route  
  path="/help&support"
  element={
    <ProtectedRoute><HelpPage/></ProtectedRoute>
  }
/>

<Route 
 path="/post"
 element={
 <ProtectedRoute>
  <Post></Post>
 </ProtectedRoute>

 }
/>

<Route 
  path="/explore"
  element={
    <ProtectedRoute>

      <ExplorePage/>
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}