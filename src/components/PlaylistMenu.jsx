import React from "react";
import Tracks from "./Tracks";

const PlaylistMenu = ({ children }) => {
  return (
    <div className="mainmenu">
      <Tracks></Tracks>
    </div>
  );
};

export default PlaylistMenu;
