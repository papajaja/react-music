const Header = () => {
  return (
    <div className="trackHeader">
      <div className="trackDetails">
        <div className="trackIndex">#</div>
        <div className="trackInfo">Название</div>
      </div>
      <div className="trackAlbum">Альбом</div>
      <div className="trackDuration">
        <svg width="20px" fill="lightgray" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3.5c-7.181 0-13 5.82-13 13s5.819 13 13 13c7.179 0 13-5.82 13-13s-5.82-13-13-13zM15.895 27.027c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5c5.798 0 10.5 4.701 10.5 10.5s-4.702 10.5-10.5 10.5zM18.93 17.131h-2.98v-5.032c0-0.546-0.443-0.99-0.989-0.99s-0.99 0.443-0.99 0.99v6.021c0 0.547 0.443 0.989 0.99 0.989h3.969c0.547 0 0.99-0.442 0.99-0.989 0-0.546-0.443-0.989-0.99-0.989z" />
        </svg>
      </div>
    </div>
  );
};

export default Header;
