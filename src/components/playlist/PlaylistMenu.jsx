import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tracks from "../track/Tracks";
import SpotifyService from "../../services/SpotifyService";
import { useFetching } from "../../hooks/useFetching";
import { getStringEnding } from "../../utils/getStringEnding";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { formatNums } from "../../utils/formatNums";
import CurrentTrack from "../../store/CurrentTrack";
import Queue from "../../store/Queue";
import Footer from "../Footer";

const Playlist_Menu = () => {
  const paramsId = useParams().id;
  const [playlist, setPlaylist] = useState({ data: null });
  const [fetchPlaylist, isLoaded, error] = useFetching(async () => {
    const response = await SpotifyService.getPlaylist(paramsId);
    setPlaylist({ data: response });
  });

  const checkClickPlaylist = (e) => {
    const tracks = document.querySelectorAll(".track");
    tracks.forEach((track, key) => {
      if (track.contains(e.target)) {
        Queue.setQueue(playlist.data.tracks.items);
      }
    });
  };

  useEffect(() => {
    fetchPlaylist();
    document.title = "Плейлист";
  }, [paramsId]);

  if (error) {
    return <div className="error_menu">Ошибка при получении данных</div>;
  }

  if (!isLoaded) {
    return (
      <span className="loader_cont">
        <span className="loader"></span>
      </span>
    );
  }

  let ps_info = "";
  const owner = playlist.data.owner.display_name;
  const likes = formatNums(playlist.data.followers.total);
  const tracks_count = playlist.data.tracks.total;
  ps_info = `${owner} | ${likes} лайк${getStringEnding(playlist.data.followers.total)} | ${tracks_count} трек${getStringEnding(tracks_count)}`;

  return (
    <SimpleBar style={{ height: "100%" }}>
      <div onClick={checkClickPlaylist} className="playlist_menu">
        <div className="playlist_header">
          <div className="playlist_picture">{playlist.data.images ? <img src={playlist.data.images[0].url} alt="" width="100%" /> : <div className="playlist_plug" />}</div>
          <div className="playlist_info">
            <h1 className="playlist_name">{playlist.data.name}</h1>
            <div className="playlist_desc">{playlist.data.description}</div>
            <div className="playlist_data">{ps_info}</div>
          </div>
        </div>
        {playlist.data.tracks.items.length > 0 ? (
          <div className="playlist_tracks">
            <Tracks tracks={playlist.data.tracks.items}></Tracks>
          </div>
        ) : (
          <div className="playlist_empty">Треки не найдены</div>
        )}
      </div>
      <Footer></Footer>
    </SimpleBar>
  );
};

export default Playlist_Menu;
