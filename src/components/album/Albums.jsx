import Album from "./Album";

const Albums = ({ albums }) => {
  return (
    <div className="albums">
      {albums.map((album, index) => (
        <Album key={index} album={album}></Album>
      ))}
    </div>
  );
};

export default Albums;
