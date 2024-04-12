import { Link } from "react-router-dom";

const Artist = ({ artist }) => {
  return (
    artist.images[0] && (
      <Link to={`../artist/${artist.id}`} className="artist">
        <div className="artistpicture">
          <img width="100%" src={`${artist.images[0].url}`} alt="" />
        </div>
        <div className="artistname">{artist.name}</div>
      </Link>
    )
  );
};

export default Artist;
