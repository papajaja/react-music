import useDebounce from "../../hooks/useDebounce";
import SpotifyService from "../../services/SpotifyService";
import useInput from "../../hooks/useInput";
import { useFetching } from "../../hooks/useFetching";
import Albums from "../album/Albums";
import { useState } from "react";
import SearchResults from "./SearchResults";
import SimpleBar from "simplebar-react";
import Footer from "../Footer";

const SearchMenu = () => {
  const [data, setData] = useState(null);
  const [fetchData, isLoaded, error] = useFetching(async (val) => {
    if (val) {
      const response = await SpotifyService.searchData(val);
      setData(response.data);
    }
  });
  const debouncedSearch = useDebounce(500, fetchData);
  const query = useInput("", () => {
    if (!query.value) setData(null);
    debouncedSearch(query.value);
  });
  document.title = "Поиск";

  return (
    <div className="searchmenu">
      <div className="searchmenu_search">
        <div className="searchmenu_icon"></div>
        <input {...query} placeholder="Введите запрос" type="text" className="searchmenu_input" />
      </div>
      <SimpleBar style={{ height: "100%" }}>
        <SearchResults query={query.value} isLoaded={isLoaded} data={data} error={error}></SearchResults>
        <Footer></Footer>
      </SimpleBar>
    </div>
  );
};

export default SearchMenu;
