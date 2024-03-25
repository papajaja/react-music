// import "../../styles/Menus.scss";
import "../../styles/media/mainplaylist.scss";
import { useEffect, useState } from "react";
import SpotifyService from "../../services/SpotifyService";
import MainPlaylist from "../playlists/MainPlaylist";

const MainMenu = ({ children }) => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const fetchPlaylists = async () => {
    setFeaturedPlaylists((await SpotifyService.getFeaturedPlaylists()).playlists.items);
    console.log(featuredPlaylists);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);
  return (
    <div className="mainmenu">
      <div className="mainContainer">
        {featuredPlaylists.map((playlist, index) => (
          <MainPlaylist key={index} image={playlist.images[0].url} name={playlist.name} desc={playlist.description} id={playlist.id}></MainPlaylist>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
