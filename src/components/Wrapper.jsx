import CurrentTrack from "../store/CurrentTrack";
import Player from "./player/Player";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";
import "./wrapper.scss";
import NavMenu from "./navigation/NavMenu";
import HeadBar from "./HeadBar";

const LayOut = observer(() => {
  return (
    <div className="wrapper">
      <div className="content">
        <NavMenu />
        <div className="mainmenucontainer">
          <HeadBar></HeadBar>
          <div className="mainmenu">
            <Outlet />
          </div>
        </div>
      </div>

      {CurrentTrack.name ? <Player></Player> : null}
    </div>
  );
});

export default LayOut;
