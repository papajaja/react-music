import { useEffect, useRef, useState } from "react";

const MediaFilter = ({ setShowMode, setPlaylists, setActive, btnRef, playlists }) => {
  const filterRef = useRef();
  const handleOff = (event) => {
    if (!filterRef.current.contains(event.target) && !btnRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOff);

    return () => {
      document.removeEventListener("click", handleOff);
    };
  }, []);

  const handleSort = (mode) => {
    if (mode === "name") {
      const sorted_ps = [...playlists].sort((a, b) => a.name.localeCompare(b.name));
      setPlaylists(sorted_ps);
    } else if (mode === "order") {
      const sorted_ps = [...playlists].sort((a, b) => a.index - b.index);
      setPlaylists(sorted_ps);
    }
  };

  return (
    <div ref={filterRef} className="media_filter">
      <div className="media_sort">
        <div className="media_sort_title">Сортировать по</div>
        <ul className="media_sort_items">
          <li onClick={() => handleSort("name")} className="media_sort_item">
            <button>&#8226; Названию</button>
          </li>
          <li onClick={() => handleSort("order")} className="media_sort_item">
            <button>&#8226; Порядку</button>
          </li>
          <li className="media_sort_item"></li>
          <li className="media_sort_item"></li>
        </ul>
        <div className="media_show_title">Показать</div>
        <ul className="media_show_items">
          <li onClick={() => setShowMode("compact")} className="media_show_item">
            <button>&#8226; Компактно</button>
          </li>
          <li onClick={() => setShowMode("list")} className="media_show_item">
            <button>&#8226; Списком</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MediaFilter;
