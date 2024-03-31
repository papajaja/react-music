import Artist from "./Artist";

const Artists = ({ artists }) => {
  return (
    <div className="artists">
      {artists.map((artist, index) => (
        <Artist key={index} artist={artist}></Artist>
      ))}
    </div>
  );
};

export default Artists;
