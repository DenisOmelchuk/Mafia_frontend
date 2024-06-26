import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import { VideoRoom } from "./components/VideoRoom";
import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage";
import Registration from "./pages/Registration";
import ProfilePage from "./pages/Profile"
import Test from './pages/test'
import WebSocketNotifications from "./components/WebSocketNotifications";
import { useEffect, useState } from "react";

export default function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/create_game" element={<CreateGame />} />
        <Route path="/join_game" element={<JoinGame />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<VideoRoom />} />
        <Route path="/a" element={<Room />} />
      </Routes>
      {/* <WebSocketNotifications/> */}
    </BrowserRouter>
    </>
  );
}
