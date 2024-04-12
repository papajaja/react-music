import SlideWindow from "../SlideWindow";
import Artist from "./Artist";

const Artists = ({ artists }) => {
  return (
    <div className="artists">
      <SlideWindow>
        {artists.map((artist, index) => (
          <Artist key={index} artist={artist}></Artist>
        ))}
      </SlideWindow>
    </div>
  );
};

export default Artists;
