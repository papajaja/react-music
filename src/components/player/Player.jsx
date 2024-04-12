import { observer } from "mobx-react";
import CurrentTrack from "../../store/CurrentTrack";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import Settings from "./Settings";

const Player = observer(() => {
  return (
    <footer className="player_container">
      {CurrentTrack.isLoaded && <ProgressBar></ProgressBar>}
      <div className="player">
        {CurrentTrack.isLoaded && (
          <>
            <div className="player_info">
              <div className="player_picture">
                <img width="40px" src={CurrentTrack.picture} alt="Track" />
              </div>
              <div className="player_track_info">
                <div className="player_name">{CurrentTrack.name}</div>
                <div className="player_author">{CurrentTrack.artists.join(", ")}</div>
              </div>
            </div>

            <div className="player_controls">
              <Controls></Controls>
            </div>

            <div className="player_settings">
              <Settings></Settings>
            </div>
          </>
        )}
      </div>
    </footer>
  );
});

export default Player;
