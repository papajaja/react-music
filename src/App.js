import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";
import PageNotFound from "./components/views/404";
import Settings from "./components/views/Settings";
import MainMenu from "./components/views/MainMenu";
import PlayList from "./components/playlist/PlaylistMenu";
import Wrapper from "./components/Wrapper";
import Artist from "./components/artist/ArtistMenu";
import Queue from "./components/views/Queue";
import Album from "./components/album/AlbumMenu";
import "./styles/app.scss";
import Login from "./components/views/Login";
import SearchMenu from "./components/views/SearchMenu";

const App = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<MainMenu />} />
          <Route path="playlist/:id" element={<PlayList />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route path="album/:id" element={<Album />} />
          <Route path="settings" element={<Settings />} />
          <Route path="queue" element={<Queue />} />
          <Route path="search" element={<SearchMenu />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default App;
