import React, { useState, useEffect } from "react";
import $api from "./api/api";
import "./app.css";
import Tracks from "./components/Tracks";
import { observer } from "mobx-react";
import CurrentTrack from "./store/CurrentTrack";
import Player from "./components/Player";

const App = observer(() => {
  return (
    <div className="app">
      <Tracks></Tracks>
      {CurrentTrack.id ? <Player></Player> : null}
    </div>
  );
});

export default App;
