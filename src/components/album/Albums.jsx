import SlideWindow from "../SlideWindow";
import Album from "./Album";

const Albums = ({ albums }) => {
  return (
    <div className="albums">
      <SlideWindow>
        {albums.map((album, index) => (
          <Album key={index} album={album}></Album>
        ))}
      </SlideWindow>
    </div>
  );
};

export default Albums;
