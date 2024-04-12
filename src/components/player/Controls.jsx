import { observer } from "mobx-react";
import CurrentTrack from "../../store/CurrentTrack";
import Queue from "../../store/Queue";
import TrackService from "../../services/TrackService";

const Controls = observer(() => {
  const resume = () => {
    CurrentTrack.switchPaused();
  };

  return (
    <>
      <button onClick={TrackService.switchMixed} className={"player_mix" + (Queue.isMixed ? "_1" : "_0")} />
      <button onClick={TrackService.playPrev} className="player_prev"></button>
      <button onClick={resume} className={"player" + (CurrentTrack.isPaused ? "_play" : "_pause")} />
      <button onClick={TrackService.playNext} className="player_next"></button>
      <button onClick={TrackService.switchRepeat} className={"player_repeat" + (Queue.isRepeated ? "_1" : "_0")}></button>
    </>
  );
});

export default Controls;
