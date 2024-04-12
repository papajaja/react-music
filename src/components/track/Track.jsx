import { observer } from "mobx-react";
import TrackService from "../../services/TrackService";
import { Link } from "react-router-dom";
import React from "react";
import Queue from "../../store/Queue";
import { calcDuration } from "../../utils/calcDuration";
import curr_track from "../../store/CurrentTrack";

const Track = observer(({ index, track }) => {
  const handleSet = async (e) => {
    TrackService.setTrack(track);
  };

  return (
    track.preview_url && (
      <div style={{ backgroundColor: curr_track.id === track.id ? "rgb(255, 255, 255, 0.2)" : "" }} onClick={handleSet} className="track">
        <div className="trackDetails">
          <div className="trackIndex">{index + 1}</div>
          {track.album && (
            <div className="trackPicture">
              <img alt="track" width="30px" src={track.album.images[0].url} />
            </div>
          )}
          <div className="trackInfo">
            <div className="trackname">{track.name}</div>
            <div className="trackartists">
              {track.artists.map((artist, index) => (
                <React.Fragment key={index}>
                  <Link to={`../artist/${artist.id}`} onClick={(e) => e.stopPropagation()} className="trackartist">
                    {artist.name}
                  </Link>
                  {index !== track.artists.length - 1 ? <span>,</span> : ""}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {track.album && (
          <Link onClick={(e) => e.stopPropagation()} to={`../album/${track.album.id}`} className="trackalbum">
            <span className="trackalbum_content">{track.album.name}</span>
          </Link>
        )}
        <div className="trackDuration">{calcDuration(track.duration_ms)}</div>
      </div>
    )
  );
});

export default Track;
