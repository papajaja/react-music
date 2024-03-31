import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tracks from "../track/Tracks";
import SpotifyService from "../../services/SpotifyService";

const PlaylistMenu = () => {
  const paramsId = useParams().id;
  const [playlist, setPlaylist] = useState({ description: null, followers: null, image: null, name: null, r: null, g: null, b: null, tracks: [] });

  const fetchPlaylist = async () => {
    const response = await SpotifyService.getPlaylist(paramsId);
    const { description, followers, images, name, primary_color } = response;
    const r = parseInt(primary_color.substring(1, 3), 16);
    const g = parseInt(primary_color.substring(3, 5), 16);
    const b = parseInt(primary_color.substring(5, 7), 16);
    setPlaylist({ description: description, followers: followers.total, image: images[images.length - 1].url, name: name, r: r, g: g, b: b, tracks: response.tracks.items });
  };

  const img = new Image();
  img.src = playlist.image;
  const imgData = img.src.data

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="playlistmenu">
      {/* <div className="playlistbg" /> */}
      <div style={{ background: `linear-gradient(to bottom, rgba(${playlist.r}, ${playlist.g}, ${playlist.b}, 0.3), transparent 95%)` }} className="playlistheader">
        <div className="playlistpicture">
          <img src={playlist.image} alt="" width="100%" />
        </div>
        <div className="playlistinfo">
          <h1 className="playlisttitle">{playlist.name}</h1>
          <div className="playlistdesc">{playlist.description}</div>
          <div className="playlistlikes">{playlist.followers} followers</div>
        </div>
      </div>
      <div className="playlisttracks">
        <Tracks tracks={playlist.tracks}></Tracks>
      </div>
    </div>
  );
};

export default PlaylistMenu;
