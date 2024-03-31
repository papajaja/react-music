import { Link } from "react-router-dom";
import handleStrings from "../../handlers/handleStrings";
import { useEffect, useState } from "react";

const Artist = ({ artist }) => {
  const name = handleStrings.handleName(artist.name, 20);
  return (
    <Link to={`../artist/${artist.id}`} className="artist">
      <div className="artistpicture">
        <img width="100%" src={`${artist.images[0].url}`} alt="" />
      </div>
      <div className="artistname">{name}</div>
      <div className="artistyear">Year</div>
    </Link>
  );
};

export default Artist;
