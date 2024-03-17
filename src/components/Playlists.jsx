import { useState } from "react";
import Playlist from "./Playlist";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, text: "Понравившиеся", path: "/liked" },
    { id: 2, text: "Избранное", path: "/favorites" },
  ]);

  return (
    <div className="playlists">
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} path={playlist.path} index={playlist.id} text={playlist.text}></Playlist>
      ))}
    </div>
  );
};

export default Playlists;
