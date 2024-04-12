// import "../../styles/Menus.scss";
import { useEffect, useState } from "react";
import SpotifyService from "../../services/SpotifyService.js";
import Playlist from "../playlist/Playlist.jsx";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching.js";
import SimpleBar from "simplebar-react";
import SlideWindow from "../SlideWindow.jsx";
import Footer from "../Footer.jsx";

const MainMenu = ({ children }) => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [fetchPlaylists, isLoaded, error] = useFetching(async () => {
    const response = await SpotifyService.getFeaturedPlaylists();
    setFeaturedPlaylists(response.data.playlists.items);
  });

  useEffect(() => {
    fetchPlaylists();
    document.title = "Главная";
  }, []);

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

  return (
    <SimpleBar style={{ height: "100%" }}>
      <div className="mainmenu">
        <div className="mainmenu_title">Популярные плейлисты</div>
        <div className="mainmenu_playlists">
          <SlideWindow height={800}>
            {featuredPlaylists.map((playlist, index) => (
              <Playlist key={index} image={playlist.images[0].url} name={playlist.name} desc={playlist.description} id={playlist.id}></Playlist>
            ))}
          </SlideWindow>
        </div>
      </div>
      <Footer></Footer>
    </SimpleBar>
  );
};

export default MainMenu;
