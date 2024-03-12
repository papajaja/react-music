import React, { useState, useEffect } from "react";
import "./app.scss";
import Tracks from "./components/Tracks";
import { observer } from "mobx-react";
import CurrentTrack from "./store/CurrentTrack";
import Player from "./components/Player";
import NavigateMenu from "./components/NavigateMenu";
import MainMenu from "./components/MainMenu";

const App = observer(() => {
  return (
    <div className="app">
      <div className="workspace">
        <NavigateMenu></NavigateMenu>
        <MainMenu>
          <Tracks></Tracks>
        </MainMenu>
      </div>

      {CurrentTrack.id ? <Player></Player> : null}
    </div>
  );
});

export default App;
