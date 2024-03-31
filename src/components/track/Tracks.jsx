import Track from "./Track";
import TracksHeader from "./TracksHeader";

export default function Tracks({ tracks }) {
  return (
    tracks && (
      <div className="tracks">
        <TracksHeader></TracksHeader>
        {tracks.map((track, index) => (
          <Track key={index} index={index} track={track.track || track} id={track}></Track>
        ))}
      </div>
    )
  );
}
