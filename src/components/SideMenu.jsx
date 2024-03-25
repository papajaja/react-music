import SearchMenu from "./SearchMenu";
import PlaylistLibrary from "./playlists/PlaylistLibrary";

const SideMenu = () => {
  return (
    <div className="sidemenu">
      <SearchMenu></SearchMenu>
      <PlaylistLibrary />
    </div>
  );
};

export default SideMenu;
