import { Link } from "react-router-dom";
import Mediateka from "./Mediateka";
import "../../icons/home.svg";

const NavMenu = () => {
  return (
    <div className="navmenu">
      <div className="navsearchmenu">
        <Link to={"/"} className="navhome">
          <span />
          <h1>Главная</h1>
        </Link>
        <Link to={"search"} className="navsearch">
          <span></span>
          <h1>Поиск</h1>
        </Link>
      </div>
      <Mediateka />
    </div>
  );
};

export default NavMenu;
