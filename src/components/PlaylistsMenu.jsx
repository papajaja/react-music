import "../styles/playlists.scss";
import Playlists from "./Playlists";

const PlaylistsMenu = () => {
  return (
    <div className="playlistsmenu">
      <div className="playlists__title">-&gt; Плейлисты &lt;-</div>
      <Playlists></Playlists>
    </div>
  );
};

export default PlaylistsMenu;
