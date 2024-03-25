import { observer } from "mobx-react";
import { useState } from "react";
import CurrentTrack from "../../store/CurrentTrack";
import "../../styles/player/player.scss";
import ProgressBar from "./ProgressBar";

const Player = observer(() => {
  const [isPaused, setIsPaused] = useState(CurrentTrack.audio.paused);
  const [volume, setVolume] = useState(CurrentTrack.audio.volume);

  const Resume = () => {
    isPaused ? CurrentTrack.audio.play() : CurrentTrack.audio.pause();
    setIsPaused((i) => !i);
  };

  const updateVolume = (event) => {
    event.target.tagName === "INPUT" ? (CurrentTrack.audio.volume = event.target.value / 100) : (CurrentTrack.audio.volume = 0);
    setVolume(event.target.value / 100);
  };

  return (
    <div className="playerContainer">
      <div className="player">
        <ProgressBar></ProgressBar>

        <div className="playerSettings">
          <div className="playerLeft">
            <div className="playerPicture"></div>
            <div className="playerTrackinfo">
              <div className="playerName">{CurrentTrack.title_m}</div>
              <div className="playerAuthor">{CurrentTrack.author_m}</div>
            </div>
          </div>

          <div className="playerCenter">
            <button className="playerMix"></button>
            <button className="playerPrev"></button>
            <button onClick={Resume} className={"player" + (isPaused ? "Play" : "Pause")} />
            <button className="playerNext"></button>
            <button className="playerRepeat"></button>
          </div>

          <div className="playerRight">
            <div className="volumeContainer">
              <button onClick={updateVolume} className={"playerVolume" + (volume === 0 ? "0" : Math.floor(volume / 0.51 + 1))}></button>
              <input onChange={updateVolume} className="playerVolume" type="range" />
              <div style={{ width: volume * 50 + "px" }} className="volumeProgress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Player;
