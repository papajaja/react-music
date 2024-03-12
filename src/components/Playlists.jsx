import { useState } from "react";
import Playlist from "./Playlist";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, text: "Понравившиеся" },
    { id: 2, text: "Избранное" },
  ]);

  return (
    <div className="playlists">
      {playlists.map((playlist) => (
        <Playlist index={playlist.id} text={playlist.text}></Playlist>
      ))}
    </div>
  );
};

export default Playlists;
