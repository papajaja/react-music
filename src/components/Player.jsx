import { observer } from "mobx-react";
import "../styles/player.scss";
import CurrentTrack from "../store/CurrentTrack";
import { useState } from "react";

const Player = observer(() => {
  const [wp, setWp] = useState(0);
  const resume = () => {
    if (CurrentTrack.isPaused) {
      CurrentTrack.audio.play();
      CurrentTrack.switchIsPaused();
    } else {
      CurrentTrack.audio.pause();
      CurrentTrack.switchIsPaused();
    }
  };

  const changeTime = (event) => {
    const progressBar = document.querySelector(".player__progressbar");

    const wpw = (100 / event.currentTarget.getBoundingClientRect().width) * (event.clientX - event.target.offsetLeft);
    progressBar.style.width = wpw + "%";

    // event.currentTarget.children[0].style.width = wpw + "%";
    CurrentTrack.audio.currentTime = (CurrentTrack.audio.duration / 100) * wpw;
  };
  const updateTime = (event) => {
    const duration = CurrentTrack.audio.duration;
    const currentTime = CurrentTrack.audio.currentTime;
    const cwp = (100 / duration) * currentTime;
    setWp(cwp);
  };

  CurrentTrack.audio.ontimeupdate = (event) => updateTime(event);

  return (
    <div className="player__container">
      <div className="player">
        <div onClick={changeTime} className="player__progress">
          <div style={{ width: `${wp}%` }} className="player__progressbar"></div>
        </div>
        <div className="player__settings">
          <div className="player__picture"></div>
          <div className="player__trackinfo">
            <div className="player__name">{CurrentTrack.name}</div>
            <div className="player__author">{CurrentTrack.author}</div>
          </div>
          <button className="player__volume"></button>
          <div className="player__nav">
            <button className="player__prev"></button>
            <button onClick={resume} className={"player__stop" + (CurrentTrack.audio.paused ? " play" : " pause")}></button>
            <button className="player__next"></button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Player;
