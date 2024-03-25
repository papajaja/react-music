import { Link } from "react-router-dom";

const MainPlaylist = ({ desc, id, image, name }) => {
  const max_desc = 53;
  const max_name = 21;
  const desc_m = desc.length > max_desc ? desc.slice(0, max_desc - 2) + "..." : desc;
  const name_m = name.length > max_name ? name.slice(0, max_name - 2) + "..." : name;
  return (
    <Link className="mainPlaylist" to={"playlist/" + id}>
      <div style={{ background: `url(${image}) center center no-repeat`, backgroundSize: "cover" }} className="mainImage"></div>
      <div className="mainInfo">
        <div className="mainName">{name_m}</div>
        <div className="mainDesc">{desc_m}</div>
      </div>
    </Link>
  );
};

export default MainPlaylist;
