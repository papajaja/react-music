import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyService from "../../services/SpotifyService";
import Tracks from "../track/Tracks";
import { useFetching } from "../../hooks/useFetching";
import SimpleBar from "simplebar-react";
import ArtistsList from "../ArtistsList";
import TrackService from "../../services/TrackService";
import Footer from "../Footer";
import { getStringEnding } from "../../utils/getStringEnding";

const AlbumMenu = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [fetchAlbum, isLoaded, error] = useFetching(async () => {
    const response = await SpotifyService.getAlbum(id);
    setAlbum(response.data);
    console.log("album", response.data);
  });

  const checkClickAlbum = (e) => {
    const tracks = document.querySelectorAll(".track");
    tracks.forEach((track, key) => {
      if (track.contains(e.target)) {
        TrackService.setQueue(album.tracks.items);
      }
    });
  };

  useEffect(() => {
    fetchAlbum();
    document.title = "Альбом";
  }, [id]);

  if (error) {
    return <div className="error_menu">Ошибка при получении данных</div>;
  }

  if (!isLoaded) {
    return (
      <span className="loader_cont">
        <span className="loader"></span>
      </span>
    );
  }

  let ps_info = "";

  const year = album.release_date.slice(0, 4);
  const tracks_count = album.tracks.total;
  ps_info = `| ${year} | ${tracks_count} трек${getStringEnding(tracks_count)}`;

  return (
    <SimpleBar style={{ height: "100%" }}>
      <div className="albummenu">
        <div className="albummenuview">
          <div className="albummenupicture">
            <img width="300px" src={album.images[0].url} alt="" />
          </div>
          <div className="albummenuinfo">
            <div className="albummenualbum">Альбом</div>
            <div className="albummenuname">{album.name}</div>
            <div className="albummenuartists">
              <ArtistsList artists={album.artists} />
              &nbsp;{ps_info}
            </div>
            <div className="albummenutrackcount"></div>
            <div className="albummenuduration"></div>
          </div>
        </div>
        <div onClick={checkClickAlbum} className="albumtracks">
          <Tracks tracks={album.tracks.items}></Tracks>
        </div>
      </div>
      <Footer></Footer>
    </SimpleBar>
  );
};

export default AlbumMenu;
