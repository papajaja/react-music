import { Link } from "react-router-dom";

const Playlist = ({ image, name, owner, id }) => {
  const contextMenu = (event) => {
    event.preventDefault();
    // do something
  };

  return (
    <Link onContextMenu={contextMenu} to={`../../../playlist/${id}`} className="media_ps">
      <div className="media_ps_image">{image ? <img alt="" src={image} /> : <div className="media_ps_plug"></div>}</div>
      <div className="media_ps_info">
        <div className="media_ps_name">{name}</div>
        <div className="media_ps_owner">{owner.display_name}</div>
      </div>
    </Link>
  );
};

export default Playlist;
