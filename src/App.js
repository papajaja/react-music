import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";
import PageNotFound from "./components/views/404";
import Settings from "./components/views/Settings";
import MainPage from "./components/views/MainMenu";
import PlayList from "./components/playlist/PlaylistMenu";
import Wrapper from "./components/Wrapper";
import Artist from "./components/artist/ArtistMenu";
import Queue from "./components/views/Queue";
import Album from "./components/album/AlbumMenu";
import Track from "./components/track/TrackMenu";
import "./styles/app.scss";

const App = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<MainPage />} />
          <Route path="playlist/:id" element={<PlayList />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route path="track/:id" element={<Track />} />
          <Route path="album/:id" element={<Album />} />
          <Route path="settings" element={<Settings />} />
          <Route path="queue" element={<Queue />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default App;
