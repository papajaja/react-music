import Track from "./Track";
import TracksHeader from "./TracksHeader";

export default function Tracks({ tracks }) {
  const someTrack = tracks[0].track || tracks[0];
  return (
    tracks && (
      <div className="tracks">
        <TracksHeader isAlbum={someTrack.album ? true : false}></TracksHeader>
        {tracks.map((track, index) => (
          <Track key={index} index={index} track={track.track || track} id={track}></Track>
        ))}
      </div>
    )
  );
}
