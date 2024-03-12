import PlaylistsMenu from "./PlaylistsMenu";
import SearchMenu from "./SearchMenu";
import "../styles/navigatemenu.scss";

const NavigateMenu = () => {
  return (
    <div className="navigatemenu">
      <SearchMenu></SearchMenu>
      <PlaylistsMenu></PlaylistsMenu>
    </div>
  );
};

export default NavigateMenu;
