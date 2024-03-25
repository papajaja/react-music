import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/media/playlists.scss";
// import "../../styles/Menus.scss";

const PlaylistLibrary = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, text: "Favorites", path: "/1" },
    { id: 2, text: "Others...", path: "/favorites" },
  ]);

  return (
    <div className="playlistsmenu">
      <div className="playlists__title">Плейлисты</div>
      <div className="playlists">
        {playlists.map((playlist) => (
          <Link key={playlist.id} className="playlist" to={"/playlist" + playlist.path}>
            {playlist.id}. {playlist.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistLibrary;
