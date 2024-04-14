import React, { useRef, useState } from "react";
import curr_track from "../../store/CurrentTrack";
import { Link } from "react-router-dom";
import MyInput from "../MyInput";

const Settings = () => {
  const btn = useRef();
  const handleVolume = (vol) => {
    curr_track.audio.volume = vol / 100;
    curr_track.setVolume(vol);
    if (btn.current.getAttribute("data-title") === "Включить звук") {
      btn.current.setAttribute("data-title", "Выключить звук");
      btn.current.style.filter = "brightness(100%)";
      curr_track.audio.volume = curr_track.volume / 100;
    }
  };

  const handleSwitch = (e) => {
    if (e.target.getAttribute("data-title") === "Выключить звук") {
      e.target.setAttribute("data-title", "Включить звук");
      e.target.style.filter = "brightness(60%)";
      curr_track.audio.volume = 0;
    } else {
      e.target.setAttribute("data-title", "Выключить звук");
      e.target.style.filter = "brightness(100%)";
      curr_track.audio.volume = curr_track.volume / 100;
    }
  };

  return (
    <React.Fragment>
      <div className="p_settings_buttons">
        <button className="p_settings_like" data-title="Не поддерживается API"></button>
        <button className="p_settings_add" data-title="Не поддерживается API"></button>
        <div className="p_settings_volume_cont">
          <button
            ref={btn}
            onClick={handleSwitch}
            data-title="Выключить звук"
            className="p_settings_volume"
          ></button>
          <div className="p_settings_vol_cont">
            <MyInput
              value={20}
              height={5}
              paddingX={0}
              paddingY={0}
              thumbColor="lightgray"
              trackColor="gray"
              width={60}
              onChange={(vol) => handleVolume(vol)}
            ></MyInput>
          </div>
        </div>
        <Link to={"../../../queue"} className="p_settings_queue" data-title="Очередь"></Link>
      </div>
    </React.Fragment>
  );
};

export default Settings;
// queue
// volume
// like
// add
