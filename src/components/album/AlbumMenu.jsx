import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpotifyService from "../../services/SpotifyService";
import Tracks from "../track/Tracks";
import handleStrings from "../../handlers/handleStrings";

const AlbumMenu = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const fetchAlbum = async () => {
    const response = await SpotifyService.getAlbum(id);
    setAlbum(response.data);
    console.log("album", response.data);
  };
  useEffect(() => {
    fetchAlbum();
  }, []);
  // album && console.log(album.tracks.items);
  return (
    album && (
      <div className="albummenu">
        <div className="albummenuview">
          <div className="albummenupicture">
            <img width="300px" src={album.images[0].url} alt="" />
          </div>
          <div className="albummenuinfo">
            <div className="albummenualbum">Альбом</div>
            <div className="albummenuname">{album.name}</div>
            <div className="albummenuartists">
              {album.artists.map((artist, i) => (
                <React.Fragment key={i}>
                  <Link to={`../artist/${artist.id}`} className="albummenuartist">
                    {artist.name}
                  </Link>
                  <span>{i === album.artists.length - 1 ? " " : ", "}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="albummenutrackcount"></div>
            <div className="albummenuduration"></div>
          </div>
        </div>
        <div className="albumtracks">
          <Tracks tracks={album.tracks.items}></Tracks>
        </div>
      </div>
    )
  );
};

export default AlbumMenu;
