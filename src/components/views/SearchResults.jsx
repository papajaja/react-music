import { useEffect } from "react";
import Albums from "../album/Albums";
import Artists from "../artist/Artists";
import Tracks from "../track/Tracks";
import Playlist from "../playlist/Playlist";
import SlideWindow from "../SlideWindow";
import Queue from "../../store/Queue";
import TrackService from "../../services/TrackService";

const SearchResults = ({ error, isLoaded, data, query }) => {
  useEffect(() => {}, []);

  if (error) {
    return <div className="error_menu">Ошибка при получении данных</div>;
  }

  if (!isLoaded && query) {
    return (
      <span className="loader_cont2">
        <span className="loader"></span>
      </span>
    );
  }

  if (!query) {
    return (
      <div className="loader_cont2">
        <div className="search_noquery"></div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const checkClickPlaylist = (e) => {
    const tracks = document.querySelectorAll(".track");
    tracks.forEach((track, key) => {
      if (track.contains(e.target)) {
        TrackService.setQueue(data.tracks.items);
      }
    });
  };

  return (
    <div className="searchmenu_results">
      {data.tracks.items.length > 0 && (
        <div onClick={checkClickPlaylist} className="searchmenu_tracks">
          <h2 className="searchmenu_tracks_title">Найденные треки</h2>
          <Tracks tracks={data.tracks.items}></Tracks>
        </div>
      )}
      {data.albums.items.length > 0 && (
        <div className="searchmenu_albums">
          <h2 className="searchmenu_albums_title">Найденные альбомы</h2>
          <Albums albums={data.albums.items}></Albums>
        </div>
      )}
      {data.artists.items.length > 0 && (
        <div className="searchmenu_artists">
          <h2 className="searchmenu_artists_title">Найденные авторы</h2>
          <Artists artists={data.artists.items}></Artists>
        </div>
      )}
      {data.playlists.items.length > 0 && (
        <div className="searchmenu_playlists_cont">
          <h2 className="searchmenu_playlists_title">Найденные плейлисты</h2>
          <div className="searchmenu_playlists">
            <SlideWindow>
              {data.playlists.items.map((ps, i) => (
                <Playlist desc={ps.description} id={ps.id} image={ps.images[0] ? ps.images[0].url : null} name={ps.name} key={i}></Playlist>
              ))}
            </SlideWindow>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
