import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import MainPage from "./MainPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Room from "./Room";
import Jerry from "./Jerry";
import Transportation from "./Transportation";

function HomePage(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/join" element={<RoomJoinPage />} />
        <Route exact path="/create" element={<CreateRoomPage />} />
        <Route exact path="/room/:roomCode" element={<Room />} />
        <Route exact path="/jerry" element={<Jerry />} />
        <Route exact path="/trans" element={<Transportation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default HomePage;
