import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tracks from "../tracks/Tracks";
import $api from "../../api/api";
import CurrentPlaylist from "../../store/CurrentPlaylist";
import "../../styles/media/playlistpage.scss";
import SpotifyService from "../../services/SpotifyService";

const PlayListPage = () => {
  const paramsId = useParams().id;
  // console.log(id);
  const [description, setDescription] = useState("");
  const [followers, setFollowers] = useState();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [tracks, setTracks] = useState([]);

  const fetchPlaylist = async () => {
    const response = await SpotifyService.getPlaylist(paramsId);
    const { description, followers, images, name, primary_color } = response;
    setDescription(description);
    setFollowers(followers.total);
    setImage(images[0].url);
    setName(name);
    setPrimaryColor(primary_color);
    console.log(response.tracks.items);
    setTracks(response.tracks.items);

    setLoaded(true);
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="playlistMenu">
      {/* <div className="playlistBg"></div> */}
      <div className="playlistHeader">
        <div className="playlistPicture">
          <img src={image} alt="" width="100%" />
        </div>
        <div className="playlistInfo">
          <h1 className="playlistTitle">{name}</h1>
          <div className="playlistDesc">{description}</div>
          {/* <div className="playlistAuthor">{CurrentPlaylist.author}</div> */}
          <div className="playlistLikes">{followers}</div>
        </div>
      </div>
      <div className="playlistTracks">
        <Tracks tracks={tracks}></Tracks>
      </div>
    </div>
  );
};

export default PlayListPage;
