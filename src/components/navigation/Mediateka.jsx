import { useState } from "react";
import { Link } from "react-router-dom";
import $api from "../../api/api";

const Mediateka = () => {
  const [playlists, setPlaylists] = useState([
    // { id: 1, text: "Favorites", path: "/favorites" },
    // { id: 2, text: "Settings", path: "/settings" },
    // { id: 3, text: "Queue", path: "/queue" },
  ]);

  const handleClick = async () => {
    const response = await $api.get("me");
    console.log("go");
    // console.log(response);
  };

  return (
    <div className="mediatekacontainer">
      {/* <button onClick={handleClick}>click me</button> */}
      <div className="mediatekatitle">
        <span></span>
        <h2>Моя медиатека</h2>
        <div></div>
      </div>
      <div className="mediatekasearch">
        <span></span>
        <input placeholder="Search playlists" type="text" />
      </div>
      <div className="mediateka">
        {playlists.map((playlist) => (
          <Link key={playlist.id} className="mediaitem" to={"/playlist" + playlist.path}>
            <img></img>
            {playlist.id}. {playlist.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Mediateka;
