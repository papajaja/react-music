import { useState, useEffect } from "react";
import "../../styles/player/progressbar.scss";
import CurrentTrack from "../../store/CurrentTrack";
import { observer } from "mobx-react-lite";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const handleEnter = (event) => {
    const progressTime = document.querySelector(".progressTime");
    progressTime.style.display = "flex";
    // progressTime.style.marginLeft = "-100px";
    updateArea(event);
  };

  const handleOut = (event) => {
    const progressTime = document.querySelector(".progressTime");
    progressTime.style.display = "none";
  };

  const updateArea = (event) => {
    const progress = document.querySelector(".progress");
    const progressTime = document.querySelector(".progressTime");
    const clientLeft = event.clientX;
    const progressLeft = clientLeft - progress.getBoundingClientRect().left;
    const onePercentSecs = CurrentTrack.audio.duration / 100;
    const onePercentPxs = (progressLeft / progress.getBoundingClientRect().width) * 100;
    const currTime = onePercentSecs * onePercentPxs;
    const currSecs = Math.floor(currTime % 60);
    const currMins = Math.floor(currTime / 60);
    progressTime.innerText = `${currMins}:${currSecs.toString().padStart(2, "0")}`;
    progressTime.style.marginLeft = clientLeft + "px";
    progress.style.display = "block";
  };

  const handleMove = (event) => {
    updateArea(event);
  };

  const handleClick = (event) => {
    const progressBar = document.querySelector(".progressbar");
    const progress = document.querySelector(".progress");
    const margin = progressBar.getBoundingClientRect().left;
    const onePixel = 100 / progress.getBoundingClientRect().width;

    let width = (event.clientX - margin) * onePixel;
    if (width > 100) width = 100;
    if (width < 0) width = 0;

    const onePercent = CurrentTrack.audio.duration / 100;
    CurrentTrack.audio.currentTime = onePercent * width;

    setProgress(width);
  };

  const updateTime = () => {
    const percentage = (100 / CurrentTrack.audio.duration) * CurrentTrack.audio.currentTime;
    setProgress(percentage);
  };

  CurrentTrack.audio.addEventListener("timeupdate", updateTime);

  return (
    <>
      <div className="progressTime"></div>
      <span onMouseMove={handleMove} onMouseEnter={handleEnter} onMouseOut={handleOut} onClick={handleClick} className="progressArea"></span>
      <div className="progress">
        <div style={{ width: progress + "%" }} className="progressbar"></div>
      </div>
    </>
  );
};

export default ProgressBar;
