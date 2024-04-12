import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyService from "../../services/SpotifyService";
import Track from "../track/Track";
import Albums from "../album/Albums";
import Artists from "./Artists";
import { useFetching } from "../../hooks/useFetching";
import SimpleBar from "simplebar-react";
import CurrentTrack from "../../store/CurrentTrack";
import Queue from "../../store/Queue";
import TrackService from "../../services/TrackService";
import Footer from "../Footer";

const ArtistMenu = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    artistName: null,
    artistFollowers: null,
    artistImage: null,
    artistAlbums: null,
    artistPopular: null,
    artistRelated: null,
  });
  const [fetchData, isLoaded, error] = useFetching(async () => {
    const { artist, artistAlbums, artistPopular, artistRelated } = await SpotifyService.getArtist(id);
    setData({
      artistName: artist.data.name,
      artistFollowers: artist.data.followers.total,
      artistImage: artist.data.images && artist.data.images[0].url,
      artistAlbums: artistAlbums.data.items,
      artistPopular: artistPopular.data.tracks,
      artistRelated: artistRelated.data.artists,
    });
  });

  const checkClickArtist = (e) => {
    const tracks = document.querySelectorAll(".track");
    tracks.forEach((track, key) => {
      if (track.contains(e.target)) {
        console.log("setting");
        TrackService.setQueue(data.artistPopular);
      }
    });
  };

  useEffect(() => {
    fetchData();
    document.title = "Артист";
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

  return (
    <SimpleBar style={{ height: "100%" }}>
      <div className="artistmenu">
        <div className="artistmenuview">
          <div className="artistmenupicture">
            <img src={data.artistImage} alt="" />
          </div>
          <div className="artistmenuinfo">
            <h1 className="artistmenuname">{data.artistName}</h1>
            <button title="Не поддерживается API" className="artistmenusubscribe">
              Подписаться
            </button>
          </div>
        </div>

        <div className="artistmenumedia">
          <div onClick={checkClickArtist} className="artist_popular">
            <h1 className="artist_popular_title">Популярные треки</h1>
            {data.artistPopular.length ? data.artistPopular.map((track, i) => <Track key={i} index={i} track={track}></Track>) : <div>--- no tracks ---</div>}
          </div>
          <div className="artist_albums">
            <h1 className="artist_albums_title">Популярные релизы</h1>
            <Albums albums={data.artistAlbums}></Albums>
          </div>
          <div className="artist_related">
            <h1 className="artist_related_title">Поклонникам также нравится</h1>
            <Artists artists={data.artistRelated}></Artists>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </SimpleBar>
  );
};

export default ArtistMenu;
