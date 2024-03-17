import React, { useState, useEffect } from "react";
import "./app.scss";
import Tracks from "./components/Tracks";
import { observer } from "mobx-react";
import CurrentTrack from "./store/CurrentTrack";
import Player from "./components/Player";
import NavigateMenu from "./components/NavigateMenu";
import MainMenu from "./components/MainMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./components/LayOut";
import PageNotFound from "./components/PageNotFound";
import PlaylistMenu from "./components/PlaylistMenu";

const App = observer(() => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<MainMenu />} />
            <Route path="playlist/:id" element={<PlaylistMenu />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});

export default App;
