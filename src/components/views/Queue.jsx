import { observer } from "mobx-react";
import Queue1 from "../../store/Queue";
import Track from "../track/Track";
import SimpleBar from "simplebar-react";

const Queue = observer(() => {
  document.title = "Stopify - Очередь";
  console.log(Queue.tracks);
  return (
    <SimpleBar style={{ height: "100%" }}>
      <div className="queue">
        <div className="queue_title"></div>
        <div className="queue_tracks">
          {Queue1.tracks.map((track, i) => (
            <Track key={i} index={i} track={track.track || track}></Track>
          ))}
        </div>
      </div>
    </SimpleBar>
  );
});

export default Queue;
