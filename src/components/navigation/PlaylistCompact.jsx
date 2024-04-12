import { Link } from "react-router-dom";

const PlaylistCompact = ({ name, id }) => {
  return (
    <Link to={`../../../playlist/${id}`} className="media_ps_compact">
      <div className="media_ps_compact_text">&#8226; {name}</div>
    </Link>
  );
};

export default PlaylistCompact;
