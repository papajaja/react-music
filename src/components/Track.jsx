import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import $api from "../api/api";
import CurrentTrack from "../store/CurrentTrack";

const Track = observer(({ author, name, track_id, index }) => {
  const fetchTrack = async () => {
    try {
      const response = await $api.get(`/track/${track_id}`, { responseType: "arraybuffer" });
      const audioBlob = new Blob([response.data], { type: "audio/mp3" });
      const audioURL = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioURL);
      CurrentTrack.switchIsLoaded();
      CurrentTrack.switchIsPaused();
      CurrentTrack.setAudio(newAudio, track_id, author, name);
      CurrentTrack.audio.play();
    } catch (error) {
      console.error("Ошибка при загрузке аудиофайла:", error);
    }
  };

  const buttClick = async (event) => {
    event.stopPropagation();
    if (CurrentTrack.isLoaded && CurrentTrack.id === track_id) {
      if (CurrentTrack.isPaused) {
        CurrentTrack.audio.play();
        CurrentTrack.switchIsPaused();
      } else if (CurrentTrack.audio) {
        CurrentTrack.audio.pause();
        CurrentTrack.switchIsPaused();
      }
    } else {
      if (CurrentTrack.id) CurrentTrack.audio.pause();
      fetchTrack();
    }
  };

  return (
    <div onClick={buttClick} className="track">
      <div className="track__index">{index}</div>
      <div className="track__picture"></div>
      <div className="track__info">
        <div className="track-author">{author}</div>
        <div className="track-name">{name}</div>
      </div>
    </div>
  );
});

export default Track;
