import { observer } from "mobx-react";
import TrackService from "../../services/TrackService";
import handleStrings from "../../handlers/handleStrings";
import { Link } from "react-router-dom";
import React from "react";

const Track = observer(({ index, track }) => {
  const name_max_length = 30;
  // const artists_max_length = 30;
  const album_max_length = 40;

  const duration_t = track.duration_ms / 1000;
  const duration_m = Math.floor(duration_t / 60);
  const duration_s = Math.floor(duration_t % 60);
  const duration = duration_m + ":" + duration_s.toString().padStart(2, "0");

  const name = handleStrings.handleName(track.name, name_max_length);
  const album = track.album && handleStrings.handleAlbum(track.album.name, album_max_length);

  const track_h = document.querySelector(".trackalbum_h");
  if (!track.album && track_h) {
    console.log(track_h);
    track_h.remove();
  }

  const artists = track.artists;

  const handleSet = async () => {
    TrackService.setTrack(track.id, track.preview_url);
    // console.log(track);
  };
  const stP = (e) => e.stopPropagation();

  return (
    <div style={{ filter: track.preview_url ? "" : "blur(2px) brightness(50%)" }} onClick={handleSet} className="track">
      <div className="trackDetails">
        <div className="trackIndex">{index + 1}</div>
        {track.album && (
          <div className="trackPicture">
            <img alt="track" width="30px" src={track.album.images[0].url} />
          </div>
        )}
        <div className="trackInfo">
          <Link onClick={stP} className="trackname" to={`../track/${track.id}`}>
            {name}
          </Link>
          <div className="trackartists">
            {artists.map((artist, index) => (
              <React.Fragment key={index}>
                <Link to={`../artist/${artist.id}`} onClick={stP} className="trackartist">
                  {artist.name}
                </Link>
                {index !== artists.length - 1 ? <span>,</span> : ""}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {track.album && (
        <Link onClick={stP} to={`../album/${track.album.id}`} className="trackalbum">
          {album}
        </Link>
      )}
      {/* <div className="trackalbum">{album}</div> */}
      <div className="trackDuration">{duration}</div>
    </div>
  );
});

export default Track;
