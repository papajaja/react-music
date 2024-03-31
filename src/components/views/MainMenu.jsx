// import "../../styles/Menus.scss";
import { useEffect, useState } from "react";
import SpotifyService from "../../services/SpotifyService.js";
import Playlist from "../playlist/Playlist.jsx";

const MainMenu = ({ children }) => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const fetchPlaylists = async () => {
    const response = await SpotifyService.getFeaturedPlaylists();
    if (response) {
      setFeaturedPlaylists(response.data.playlists.items);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="mainpage">
      {featuredPlaylists.map((playlist, index) => (
        <Playlist key={index} image={playlist.images[0].url} name={playlist.name} desc={playlist.description} id={playlist.id}></Playlist>
      ))}
    </div>
  );
};

export default MainMenu;
