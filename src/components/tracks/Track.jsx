import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import $api from "../../api/api";
import CurrentTrack from "../../store/CurrentTrack";

const Track = observer(({ index, track }) => {
  const name_max_length = 30;
  const artists_max_length = 30;
  const album_max_length = 40;

  const duration_t = track.duration_ms / 1000; // total
  const duration_m = Math.floor(duration_t / 60); // mins
  const duration_s = Math.floor(duration_t % 60); // secs
  const duration = duration_m + ":" + duration_s.toString().padStart(2, "0");

  const name = track.name;
  const album = track.album.name;
  const artistsArr = track.artists.map((q) => q.name);
  const artists = artistsArr.join(", ");
  // console.log(artists);

  const name_m = name.length > name_max_length ? name.slice(0, name_max_length - 2) + "..." : name;
  const album_m = album.length > album_max_length ? album.slice(0, name_max_length - 2) + "..." : album;
  const artists_m = artists.length > artists_max_length ? artists.slice(0, artists_max_length - 2) + "..." : artists;

  return (
    <div className="track">
      <div className="trackDetails">
        <div className="trackIndex">{index + 1}</div>
        <div className="trackPicture">
          <img width="30px" src={track.album.images[0].url} alt="" />
        </div>
        <div className="trackInfo">
          <div className="trackName">{name_m}</div>
          <div className="trackAuthor">{artists_m}</div>
        </div>
      </div>
      <div className="trackAlbum">{album_m}</div>
      <div className="trackDuration">{duration}</div>
    </div>
  );
});

export default Track;
