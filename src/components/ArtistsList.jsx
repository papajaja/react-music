import React from "react";
import { Link } from "react-router-dom";

const ArtistsList = ({ artists }) => {
  return (
    <div className="artist_list">
      {artists.map((artist, i) => (
        <React.Fragment key={i}>
          <Link to={`../../artist/${artist.id}`} className="artist_item">
            {artist.name}
          </Link>
          <span>{i === artists.length - 1 ? " " : ", "}</span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ArtistsList;
