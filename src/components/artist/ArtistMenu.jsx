import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyService from "../../services/SpotifyService";
import Track from "../track/Track";
import Albums from "../album/Albums";
import Artists from "./Artists";

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
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    setIsLoaded(false);
    const { artist, artistAlbums, artistPopular, artistRelated } = await SpotifyService.getArtist(id);
    // const followers = artist.data.followers.total;
    // const followersMils = followers / 1000000
    // const followersThou = followers %
    // const followers

    setData({
      artistName: artist.data.name,
      artistFollowers: artist.data.followers.total,
      artistImage: artist.data.images[0].url,
      artistAlbums: artistAlbums.data.items,
      artistPopular: artistPopular.data.tracks,
      artistRelated: artistRelated.data.artists,
    });
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="artistmenu">
      {isLoaded && (
        <>
          <div className="artistmenuview">
            <div className="artistmenupicture">
              <img src={data.artistImage} alt="" />
            </div>
            <div className="artistmenuinfo">
              <h1 className="artistmenuname">{data.artistName}</h1>
              <div className="artistmenufollowers">{data.artistFollowers} слушателей</div>
              <button className="artistmenusubscribe">Подписаться</button>
              <button className="artistmenuplay">Слушать</button>
            </div>
          </div>
          <div className="artistmenumedia">
            <div className="artistmenupopular">
              <h1>Популярные треки</h1>
              {data.artistPopular.length ? data.artistPopular.map((track, i) => <Track key={i} index={i} track={track}></Track>) : <div>--- no tracks ---</div>}
            </div>
            <div className="artistmenualbums">
              <h1>Популярные релизы</h1>
              <Albums albums={data.artistAlbums}></Albums>
            </div>
            <div className="artistmenurelated">
              <h1>Поклонникам также нравится</h1>
              <Artists artists={data.artistRelated}></Artists>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistMenu;
