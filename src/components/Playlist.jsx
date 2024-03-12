const Playlist = ({ index, text }) => {
  return (
    <div className="playlist">
      {index}. {text}
    </div>
  );
};

export default Playlist;
