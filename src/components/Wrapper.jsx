import CurrentTrack from "../store/CurrentTrack";
import Player from "./player/Player";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";
import "../styles/wrapper.scss";
import SideMenu from "./SideMenu";

const LayOut = observer(() => {
  return (
    <div className="wrapper">
      <div className="content">
        <SideMenu />
        <Outlet />
      </div>

      {CurrentTrack.id ? <Player></Player> : null}
    </div>
  );
});

export default LayOut;
