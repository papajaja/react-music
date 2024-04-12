import { useRef, useState } from "react";
import SpotifyService from "../../services/SpotifyService";
import Playlist from "./Playlist";
import { useFetching } from "../../hooks/useFetching";
import SimpleBar from "simplebar-react";
import MediaFilter from "./MediaFilter";
import PlaylistCompact from "./PlaylistCompact";
import useInput from "../../hooks/useInput";
import useDebounce from "../../hooks/useDebounce";

const Mediateka = () => {
  const [playlists, setPlaylists] = useState([]);
  const [sortedPs, setSortedPs] = useState([]);
  const [showMode, setShowMode] = useState("list");
  const [fetchPlaylists, isLoaded, error] = useFetching(async () => {
    let response = await SpotifyService.getUserPlaylists();
    const ps = response.data.items;
    const ps_m = ps.map((el, i) => ({ ...el, index: i }));
    setPlaylists(ps_m);
    setSortedPs(ps_m);
    // console.log(ps_m);
  });
  const [isActive, setActive] = useState(false);
  const btnRef = useRef();

  const filterPlaylists = (value) => {
    setSortedPs([
      ...playlists.filter((ps) => {
        return ps.name.toLowerCase().includes(value.toLowerCase());
      }),
    ]);
  };

  const debouncedSearch = useDebounce(200, filterPlaylists);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };
  const [searchValue, setSearchValue] = useState("");

  useState(() => {
    fetchPlaylists();
  }, []);

  if (error) {
    return (
      <div className="mediatekacontainer">
        <div className="mediateka_error">Ошибка при получении данных</div>;
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="mediatekacontainer">
        <span className="loader_cont">
          <span className="loader"></span>
        </span>
      </div>
    );
  }

  return (
    <div className="mediatekacontainer">
      <div className="mediatekaheader">
        <div className="mediatekatitle">
          <span></span>
          <h2>Мои плейлисты</h2>
          <button title="Не поддерживается API" className="mediateka_add">
            +
          </button>
        </div>
        <div className="mediateka_navigation">
          <div className="mediatekasearch">
            <span></span>
            <input value={searchValue} onChange={handleSearch} placeholder="Поиск" type="text" />
          </div>
          <span ref={btnRef} onClick={() => setActive((i) => !i)} className="mediateka_filter" />
        </div>
      </div>

      <div className="mediateka">
        <SimpleBar style={{ height: "100%" }}>
          {sortedPs.map((ps, i) => {
            if (showMode === "list") {
              return <Playlist name={ps.name} id={ps.id} owner={ps.owner} image={ps.images && ps.images[0].url} key={i} />;
            } else return <PlaylistCompact name={ps.name} id={ps.id} key={i} />;
          })}
        </SimpleBar>
      </div>

      {isActive && <MediaFilter setShowMode={setShowMode} setPlaylists={setSortedPs} playlists={sortedPs} btnRef={btnRef} setActive={setActive} isActive={isActive}></MediaFilter>}
    </div>
  );
};

export default Mediateka;
