import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";
import "./styles/app.scss";
import MainPage from "./components/views/MainPage";
import Wrapper from "./components/Wrapper";
import PageNotFound from "./components/views/PageNotFound";
import PlayListPage from "./components/views/PlaylistPage";

const App = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<MainPage />} />
          <Route path="playlist/:id" element={<PlayListPage />} />
          {/* <Route path="author/:id" element={<PlaylistMenu />} /> */}
          {/* <Route path="settings" element={<PlaylistMenu />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
