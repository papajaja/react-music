import CurrentTrack from "../store/CurrentTrack";
import MainMenu from "./MainMenu";
import NavigateMenu from "./NavigateMenu";
import Player from "./Player";
import { Outlet } from "react-router-dom";
import "../styles/layout.scss";
import { observer } from "mobx-react";

const LayOut = observer(() => {
  return (
    <div className="layout">
      <div className="workspace">
        <NavigateMenu></NavigateMenu>
        <div>hi</div>
        <Outlet />
      </div>

      {CurrentTrack.id ? <Player></Player> : null}
    </div>
  );
});

export default LayOut;
