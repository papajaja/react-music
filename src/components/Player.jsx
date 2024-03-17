import { observer } from "mobx-react";
import { useState } from "react";
import CurrentTrack from "../store/CurrentTrack";
import "../styles/player/player.scss";
import ProgressBar from "./ProgressBar";

const Player = observer(() => {
  const [isPaused, setIsPaused] = useState(CurrentTrack.audio.paused);
  const [volume, setVolume] = useState(CurrentTrack.audio.volume);

  const Resume = () => {
    isPaused ? CurrentTrack.audio.play() : CurrentTrack.audio.pause();
    setIsPaused((i) => !i);
  };

  const updateVolume = (event) => {
    event.target.tagName == "INPUT" ? (CurrentTrack.audio.volume = event.target.value / 100) : (CurrentTrack.audio.volume = 0);
    setVolume(event.target.value / 100);
  };

  return (
    <div className="player__container">
      <div className="player">
        <ProgressBar></ProgressBar>

        <div className="player__settings">
          <div className="player__left">
            <div className="player__picture"></div>
            <div className="player__trackinfo">
              <div className="player__name">{CurrentTrack.name}</div>
              <div className="player__author">{CurrentTrack.author}</div>
            </div>
          </div>

          <div className="player__center">
            <button className="player__mix"></button>
            <button className="player__prev"></button>
            <button onClick={Resume} className={"player__" + (isPaused ? "play" : "pause")} />
            <button className="player__next"></button>
            <button className="player__repeat"></button>
          </div>

          <div className="player__right">
            <button onClick={updateVolume} className={"player__volume" + (volume == 0 ? "0" : Math.floor(volume / 0.34 + 1))}></button>
            <input onChange={updateVolume} className="player__volume" type="range"></input>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Player;
