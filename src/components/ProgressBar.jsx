import { useState, useEffect } from "react";
import "../styles/progressbar.scss";
import CurrentTrack from "../store/CurrentTrack";
import { observer } from "mobx-react-lite";

const ProgressBar = () => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDown = () => {
    setMouseDown(true);
    console.log("--- handledown ---");
  };

  const handleUp = (event) => {
    if (isMouseDown) {
      console.log("--- handleup ---", isMouseDown === true);
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
    }
    setMouseDown(false);
  };

  const updateTime = () => {
    if (!isMouseDown) {
      const percentage = (100 / CurrentTrack.audio.duration) * CurrentTrack.audio.currentTime;
      setProgress(percentage);
    }
  };

  CurrentTrack.audio.addEventListener("timeupdate", updateTime);

  console.log("--- re-render ---", isMouseDown);

  document.addEventListener("click", handleUp);

  return (
    <div onMouseDown={handleDown} className="progress">
      <div style={{ width: progress + "%" }} className="progressbar"></div>
    </div>
  );
};

export default ProgressBar;
