import { Link } from "react-router-dom";
import handleStrings from "../../handlers/handleStrings";

const Album = ({ album }) => {
  const name = handleStrings.handleName(album.name, 20);
  return (
    <Link to={`../album/${album.id}`} className="album">
      <div className="albumpicture">
        <img width="100%" src={`${album.images[0].url}`} alt="" />
      </div>
      <div className="albumname">{name}</div>
      <div className="albumyear">Year</div>
    </Link>
  );
};

export default Album;
