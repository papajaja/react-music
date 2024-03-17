import { Link } from "react-router-dom";
import "../styles/playlists.scss";

const Playlist = ({ path, index, text }) => {
  return (
    <Link className="playlist" to={"/playlist" + path}>
      {/* <div className="playlist"> */}
      {index}. {text}
      {/* </div> */}
    </Link>
  );
};

export default Playlist;
