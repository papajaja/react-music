import { Link } from "react-router-dom";

const Album = ({ album }) => {
  return (
    <Link to={`../album/${album.id}`} className="album">
      <div className="albumpicture">
        <img src={`${album.images[0].url}`} alt="" />
      </div>
      <div className="albumname">{album.name}</div>
      <div className="albumyear">{album.release_date.slice(0, 4)}</div>
    </Link>
  );
};

export default Album;
